import "./css/searchbar.css";
import JobCard from "./jobcard.jsx";
import { useEffect, useState } from "react";
import { Search } from "react-bootstrap-icons";
import Spinner from "../common/loadspinner.jsx";

const SearchBar = () => {
  const [apiData, setApiData] = useState([]);
  const [searchTextInput, setSearchTextInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiSeachData, setApiSearchData] = useState([]);
  
  const adCountString = `Sök yrke bland ${apiData.length} annonser`;

  const fetchLatestData = () => {
    const API = "http://82.102.1.109/api/joblistings";
    setIsLoading(true);
    fetch(API)
      .then((response) => response.json())
      .then((data) => setApiData(data));
    setIsLoading(false);
  };

  const fetchSearchData = (event) => {
    event.preventDefault();
    const API = "http://82.102.1.109/api/joblistings/" + searchTextInput;
    console.log(API);
    const arr = ["skitjobb", "skitjobb2", "skitjobb3", "shitjobb4"];
    setApiSearchData(arr);
    // setIsLoading(true);
    // fetch(API)
    //   .then((response) => response.json())
    //   .then((data) => setApiData(data))
    // setIsLoading(false);
  }

  useEffect(() => {
    fetchLatestData();
  }, []);
  return (
    <div>
      <div className="SearchContainer">
        <form className="SearchInput" onSubmit={(e) => fetchSearchData(e)}>
          <label>
            <input
              type="text"
              name="searchInput"
              autoComplete="false"
              placeholder={adCountString}
              onChange={(e) => setSearchTextInput(e.target.value)}
              value={searchTextInput}
            />
            <span className="SearchIcon">
              <Search /></span>
          </label>
        </form>
        {searchTextInput.length > 0 ? <span className="CloseIcon" onClick={(e) => setSearchTextInput("")}>Rensa</span> : null}
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="CardList">
          {apiSeachData.length === 0 ? null : <div className="AdCount">Hittade {apiSeachData.length} annonser som matchar din sökning</div>}
          {apiData.map((job, id) => (
            <JobCard key={id} job={job} />
            /* job.headline.toLowerCase().includes(searchTextInput.toLowerCase())
            ? [<JobCard key={id} job={job} />]
            : null */
          ))}
        </div>
      )}
    </div>
  );
};
export default SearchBar;
