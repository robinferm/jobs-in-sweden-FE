import "./css/SearchBar.css";
import JobCard from "./JobCard";
import { useEffect, useState } from "react";
import { Search } from "react-bootstrap-icons";
import SkeletonLoader from "./skeletonLoader";

const SearchBar = () => {
  const [apiData, setApiData] = useState<any[]>([]);
  const [searchTextInput, setSearchTextInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [adCount, setAdCount] = useState(0);

  const adCountString = `Sök yrke bland ${adCount} annonser`;

  const fetchSearchData = async (event:any) => {
    event.preventDefault();
    if(searchTextInput === "") return;
    setIsLoading(true);
    const API = "http://82.102.1.109/api/joblistings/search" + searchTextInput + "/1";
    await fetch(API)
      .then((response) => response.json())
      .then((data) => setApiData(data.data))
      .catch((err) => console.error(err));
    setIsLoading(false);
  };

  const fetchAdCount = () => {
    const API = "http://82.102.1.109/api/joblistings/count";
    fetch(API)
      .then((response) => response.json())
      .then((data) => setAdCount(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchAdCount();
  }, []);
  return (
    <div>
      <div className="SearchContainer">
        <form className="SearchInput" onSubmit={(e) => fetchSearchData(e)}>
          <label>
            <input
              type="text"
              name="searchInput"
              autoComplete="off"
              placeholder={adCountString}
              onChange={(e) => setSearchTextInput(e.target.value)}
              value={searchTextInput}
            />
            {/* <span className="FilterIcon" onClick={(e) => console.log(e)}>
              <Gear />
            </span> */}
            <span className="SearchIcon" onClick={(e) => fetchSearchData(e)}>
              <Search/>
            </span>
          </label>
        </form>
        {searchTextInput.length > 0 ? (
          <span className="CloseIcon" onClick={(e) => setSearchTextInput("")}>
            Rensa
          </span>
        ) : null}
      </div>
      {isLoading ? (
        <div className="loadingWrapper">
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
        </div>
      ) : (
        <div className="CardList">
          {apiData.length !== 0 ? (
            <div className="AdCount">
              Hittade {apiData.length} annonser som matchar din sökning
            </div>
          ) : null}
          {apiData.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};
export default SearchBar;
