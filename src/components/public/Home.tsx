import "./css/Home.css";
import { useState, useEffect } from "react";
import Header from "../common/Header";
import AdCardList from "../common/AdCardList";
import SingleAdList from "../common/SingleAdList";
import { Row, Col, Container } from "react-bootstrap";
import SavedAds from "../common/SavedAds";

const Home = () => {
  const [latestAdApiData, setLatestAdApiData] = useState([]);
  const [searchBarText, setSearchBarText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isWatchingAdSection, SetIsWatchingAdSection] = useState(true);
  const [totalAdCount, setTotalAdCount] = useState(0);
  const [searchCount, setSearchCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [prevPageNumber, setPrevPageNumber] = useState(1);
  const [adCounter, setAdCounter] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isWatchingSingleAd, setIsWatchingSingleAd] = useState(false);
  const [singleAdData, setSingleAdData] = useState({});

  // Callback function to receive what page number user is at on AdCardList.tsx
  const recieveDataFromAdCardListChild = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0,0);
  };

  // Callback function to change state of isWatchingAdSection from AdCardList.tsx
  const changeIsWatchingAdSection = (value: boolean) => {
    SetIsWatchingAdSection(value);
  };

  // Callback function to receive search bar text onChange from Header.tsx
  const searchBarResult = (value: string) => {
    setSearchBarText(value);
  };

  // Callback function to change isSearching state
  const changeIsSearching = () => {
    setIsSearching((prevSaved) => !prevSaved);
    setSearchBarText("");
    setCurrentPage(prevPageNumber);
    setSearchCount(0);
  };

  // Callback function to change isWatchingSingleAd to true from SavedAds.txt
  const callbackChangeisWatchingSingleAdTrue = () => {
    setIsWatchingSingleAd(true);
  };

  // Callback function to change isWatchingSingleAd to false from SingleAdList.txt
  const callbackChangeisWatchingSingleAdFalse = () => {
    setIsWatchingSingleAd(false);

  };

  // Callback function to change singleAdId from SavedAds.txt
  const callbackChangeSingleAdData = (arr: any, id: string) => {
    var array = [];
    for (let i = 0; i < arr.length; i++) {
      if(arr[i].id === id) {
        array.push(arr[i]);
        setSingleAdData(array);
      }
    }
  };

  // Callback function to know when user request a new search for ads in Header.tsx
  const newSearch = async (event: any) => {
    event.preventDefault();
    if (searchBarText === "") return;
    if (currentPage !== 1) {
      setPrevPageNumber(currentPage);
      setCurrentPage(1);
    }
    setIsSearching(true);
    setSearchCount(searchCount + 1);
    setSearchTerm(searchBarText);
  };

  const savedAdCounter = () => {
    setAdCounter(adCounter + 1);
  };

  // Fetch total ad count in database
  const fetchAdCount = () => {
    const API = "http://82.102.1.109/api/joblistings/count";
    fetch(API)
      .then((response) => response.json())
      .then((data) => setTotalAdCount(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => fetchAdCount(), []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (isSearching) {
        const API =
          "http://82.102.1.109/api/joblistings/search/" +
          searchBarText +
          "/" +
          currentPage;
        await fetch(API)
          .then((response) => response.json())
          .then((data) => setLatestAdApiData(data.data))
          .catch((err) => console.error(err));
      } else {
        const API = "http://82.102.1.109/api/joblistings/all/" + currentPage;
        await fetch(API)
          .then((response) => response.json())
          .then((data) => setLatestAdApiData(data.data))
          .catch((err) => console.error(err));
      }
      setIsLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, isSearching, searchCount]);

  return (
    <div className="wrapper">
      <Header
        adCount={totalAdCount}
        searchBarResult={searchBarResult}
        searchBarText={searchBarText}
        newSearch={newSearch}
      />
      <Container fluid className="content">
        <Row>
          <Col sm={3} className="SavedAdsContainer">
            <Container style={{ textAlign: "left" }}>
              <span
                style={{
                  color: "gray",
                  cursor: "default",
                  fontSize: "12px",
                  display: "inline-block",
                  height: "2rem",
                }}
              >
                Sparade annonser
              </span>
              <SavedAds
                savedAdCounter={savedAdCounter}
                callbackChangeisWatchingSingleAdTrue={callbackChangeisWatchingSingleAdTrue}
                callbackChangeSingleAdData={callbackChangeSingleAdData}
              />
            </Container>
          </Col>
          <Col sm={9} className="LatestAdsContainer">
            {!isWatchingSingleAd ? (
              <AdCardList
                apiData={latestAdApiData}
                pageNumber={currentPage}
                recieveDataFromAdCardListChild={recieveDataFromAdCardListChild}
                isWatchingAdSection={isWatchingAdSection}
                changeIsWatchingAdSection={changeIsWatchingAdSection}
                isSearching={isSearching}
                changeIsSearching={changeIsSearching}
                isLoading={isLoading}
                savedAdCounter={savedAdCounter}
                searchTerm={searchTerm}
                searchCount={searchCount}
              />
            ) : (
              <SingleAdList
                callbackChangeisWatchingSingleAdFalse={
                  callbackChangeisWatchingSingleAdFalse
                }
                singleAdData={singleAdData}
                savedAdCounter={savedAdCounter}
              />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Home;
