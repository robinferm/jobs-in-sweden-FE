import "./css/home.css";
import React, { useState, useEffect } from "react";
import Header from "../common/header";
import SkeletonLoader from "../common/skeletonLoader";
import { Row, Col, Container } from "react-bootstrap";

const Home = () => {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <Container fluid className="content">
        <Row>
          <Col sm={4} style={{ color:"white", backgroundColor: "black", height: "50rem" }}>
          <p>Sparade annonser</p>
          </Col>
          <Col sm={8} style={{ backgroundColor: "white", height: "50rem" }}>
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
