import "./css/AdCardList.css";
import React from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import JobCard from "./JobCard";
import { borderColor } from "@mui/system";

interface AdCardData {
  pageNumber: number;
  recieveDataFromAdCardListChild;
  apiData;
}

const AdCardList = (props: AdCardData) => {
  return (
    <div>
      {props.apiData !== null
        ? null
        : props.apiData.map((job) => <JobCard key={job.id} job={job} />)}
      <Container
        style={{
          minHeight: "50rem",
          paddingTop: "1rem",
          backgroundColor: "white",
          borderTopRightRadius: "20px",
          borderStyle: "solid",
          borderWidth: "1px",
          borderColor: "rgba(39, 38, 53, 0.1)",
        }}
      >
        <Row>
          <p style={{color:"gray"}}>Annonser Statistik</p>
        </Row>
        <Row style={{ paddingTop: "40rem", textAlign: "center" }}>
          <p>Sida: {props.pageNumber}</p>
          <Col>
            <Button
              variant="primary"
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
              variant="primary"
              size="sm"
              onClick={(e) => props.recieveDataFromAdCardListChild(1)}
            >
              1
            </Button>{" "}
            <Button variant="primary" size="sm">
              {props.pageNumber + 1}
            </Button>{" "}
            <Button variant="primary" size="sm">
              {props.pageNumber + 2}
            </Button>{" "}
            <Button variant="primary" size="sm">
              {props.pageNumber + 3}
            </Button>{" "}
            <Button variant="primary" size="sm">
              {props.pageNumber + 4}
            </Button>{" "}
            <Button
              variant="primary"
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
