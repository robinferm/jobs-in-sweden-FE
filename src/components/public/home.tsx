import "./css/home.css";
import React, { useState, useEffect } from "react";
import Header from "../common/Header";
import SkeletonLoader from "../common/SkeletonLoader";
import { Row, Col, Container } from "react-bootstrap";

const Home = () => {
  const [isLoading, setLoading] = useState(false);
  const [totalAdCount, setTotalAdCount] = useState(0);

  const fetchAdCount = () => {
    const API = "http://82.102.1.109/api/joblistings/count";
    fetch(API)
      .then((response) => response.json())
      .then((data) => setTotalAdCount(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchAdCount();
  }, []);

  return (
    <div className="wrapper">
      <Header adCount={totalAdCount}/>
      <Container fluid className="content">
        <Row>
          <Col sm={4} style={{ height: "50rem" }}>
          <p>Dina sparade annonser</p>
          </Col>
          <Col sm={8} style={{ height: "50rem" }}>
            <p>Annonser Statistik</p>
            <SkeletonLoader/>
            <SkeletonLoader/>
            <SkeletonLoader/>
            <SkeletonLoader/>
            <SkeletonLoader/>
            <SkeletonLoader/>
            <SkeletonLoader/>
            <SkeletonLoader/>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Home;
