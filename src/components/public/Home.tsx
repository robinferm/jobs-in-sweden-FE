import "./css/Home.css";
import React, { useState, useEffect } from "react";
import Header from "../common/Header";
import AdCardList from "../common/AdCardList";
import { Row, Col, Container } from "react-bootstrap";

const Home = () => {
  const [latestAdApiData, setLatestAdApiData] = useState([]);
  const [searchBarText, setSearchBarText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isWatchingAdSection, SetIsWatchingAdSection] = useState(true);
  const [totalAdCount, setTotalAdCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // Callback
  const recieveDataFromAdCardListChild = (page: number) => {
    setCurrentPage(page);
  };

  const changeIsWatchingAdSection = (value: boolean) => {
    SetIsWatchingAdSection(value);
  };

  // Fetch
  const fetchAdCount = () => {
    const API = "http://82.102.1.109/api/joblistings/count";
    fetch(API)
      .then((response) => response.json())
      .then((data) => setTotalAdCount(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const fetchSearchData = async () => {
      setIsLoading(true);
      const API =
        "http://82.102.1.109/api/joblistings/search/" + currentPage;
      await fetch(API)
        .then((response) => response.json())
        .then((data) => setLatestAdApiData(data.data))
        .catch((err) => console.error(err));
      setIsLoading(false);
    };

    fetchAdCount();
    fetchSearchData();
  }, [currentPage]);

  return (
    <div className="wrapper">
      <Header adCount={totalAdCount} />
      <Container fluid className="content">
        <Row>
          <Col sm={4} className="SavedAdsContainer">
            <Container>
              <p>Sparade annonser</p>
            </Container>
          </Col>
          <Col sm={8} className="LatestAdsContainer">
            <AdCardList
              apiData={latestAdApiData}
              pageNumber={currentPage}
              recieveDataFromAdCardListChild={recieveDataFromAdCardListChild}
              isWatchingAdSection={isWatchingAdSection}
              changeIsWatchingAdSection={changeIsWatchingAdSection}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Home;
