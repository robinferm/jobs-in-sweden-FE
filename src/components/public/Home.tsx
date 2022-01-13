import "./css/Home.css";
import { useState, useEffect } from "react";
import Header from "../common/Header";
import AdCardList from "../common/AdCardList";
import { Row, Col, Container } from "react-bootstrap";

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

  // Callback function to receive what page number user is at on AdCardList.tsx
  const recieveDataFromAdCardListChild = (page: number) => {
    setCurrentPage(page);
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
  }

  // Callback function to know when user request a new search for ads in Header.tsx
  const newSearch = async (event: any) => {
    event.preventDefault();
    if (searchBarText === "") return;
    if (currentPage !== 1) {
      setPrevPageNumber(currentPage);
      setCurrentPage(1);} 
    setIsSearching(true);
    setSearchCount(searchCount + 1);
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
          <Col sm={4} className="SavedAdsContainer">
            <Container style={{ textAlign: "left" }}>
              <span
                style={{
                  marginLeft: "0.5rem",
                  color: "gray",
                  cursor: "default",
                  fontSize: "12px",
                }}
              >
                Sparade annonser
              </span>
            </Container>
          </Col>
          <Col sm={8} className="LatestAdsContainer">
            <AdCardList
              apiData={latestAdApiData}
              pageNumber={currentPage}
              recieveDataFromAdCardListChild={recieveDataFromAdCardListChild}
              isWatchingAdSection={isWatchingAdSection}
              changeIsWatchingAdSection={changeIsWatchingAdSection}
              isSearching={isSearching}
              changeIsSearching={changeIsSearching}
              isLoading={isLoading}
              searchBarText={searchBarText}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Home;
