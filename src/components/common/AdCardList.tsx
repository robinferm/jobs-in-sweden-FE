import "./css/AdCardList.css";
import React from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import JobCard from "./JobCard";

interface AdCardData {
  pageNumber: number;
  recieveDataFromAdCardListChild;
  apiData;
}

const AdCardList = (props: AdCardData) => {
  return (
    <div>
      <Container className="MainContainer">
        <Row>
          <p style={{ color: "gray" }}>Annonser Statistik</p>
          <Row>
            {props.apiData === null
              ? null
              : props.apiData.map((job) => <JobCard key={job.id} job={job} />)}
          </Row>
        </Row>
        <Row style={{ textAlign: "center", paddingTop: "1rem" }}>
          <Col>
            <Button
              variant="secondary"
              size="sm"
              onClick={(e) =>
                props.pageNumber !== 1
                  ? props.recieveDataFromAdCardListChild(props.pageNumber - 1)
                  : null
              }
            >
              Föregående
            </Button>{" "}
            <Button
              variant="secondary"
              size="sm"
              onClick={(e) => props.recieveDataFromAdCardListChild(1)}
            >
              1
            </Button>{" "}
            <Button variant="secondary" size="sm">
              {props.pageNumber + 1}
            </Button>{" "}
            <Button variant="secondary" size="sm">
              {props.pageNumber + 2}
            </Button>{" "}
            <Button variant="secondary" size="sm">
              {props.pageNumber + 3}
            </Button>{" "}
            <Button variant="secondary" size="sm">
              {props.pageNumber + 4}
            </Button>{" "}
            <Button
              variant="secondary"
              size="sm"
              onClick={(e) =>
                props.recieveDataFromAdCardListChild(props.pageNumber + 1)
              }
            >
              Nästa
            </Button>{" "}
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default AdCardList;
