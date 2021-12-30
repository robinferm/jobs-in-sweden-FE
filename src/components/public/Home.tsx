import "./css/Home.css";
import React, { useState, useEffect } from "react";
import Header from "../common/Header";
import SkeletonLoader from "../common/SkeletonLoader";
import AdCardList from "../common/AdCardList";
import { Row, Col, Container } from "react-bootstrap";

const Home = () => {
  const [latestAdApiData, setLatestAdApiData] = useState([]);
  const [searchBarText, setSearchBarText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [totalAdCount, setTotalAdCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // Callback
  const recieveDataFromAdCardListChild = (page: number) => {
    setCurrentPage(page);
  };

  // Fetch
  const fetchAdCount = () => {
    const API = "http://82.102.1.109/api/joblistings/count";
    fetch(API)
      .then((response) => response.json())
      .then((data) => setTotalAdCount(data))
      .catch((err) => console.error(err));
  };

  const fetchSearchData = async () => {
    setIsLoading(true);
    const API = "http://82.102.1.109/api/joblistings/javascript/" + currentPage;
    await fetch(API)
      .then((response) => response.json())
      .then((data) => setLatestAdApiData(data.data))
      .catch((err) => console.error(err));
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAdCount();
    fetchSearchData();
  }, [currentPage]);

  return (
    <div className="wrapper">
      <Header adCount={totalAdCount} />
      <Container fluid className="content">
        <Row>
          {/* This should be its own component */}
          <Col sm={4} style={{ height: "50rem", padding: "0px" }}>
            <Container
              style={{
                minHeight: "50rem",
                textAlign: "center",
                paddingTop: "1rem",
                backgroundColor: "white",
                borderTopLeftRadius: "20px",
                borderStyle: "solid",
                borderWidth: "1px",
                borderRight: "0px",
                borderColor: "rgba(39, 38, 53, 0.1)",
              }}
            >
              <p>Sparade annonser</p>
            </Container>
          </Col>
          <Col sm={8} style={{ padding:"0px" }}>
            <AdCardList
              apiData={latestAdApiData}
              pageNumber={currentPage}
              recieveDataFromAdCardListChild={recieveDataFromAdCardListChild}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Home;
