import "./css/AdCardList.css";
import React from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import JobCard from "./JobCard";
import { borderColor } from "@mui/system";

interface AdCardData {
  pageNumber: number;
  isLoading: boolean;
  recieveDataFromAdCardListChild;
  apiData;
}

const AdCardList = (props: AdCardData) => {
  return (
    <div>
      <Container
        style={{
          height: "50rem",
          paddingTop: "1rem",
          backgroundColor: "white",
          borderTopRightRadius: "20px",
          borderStyle: "solid",
          borderWidth: "1px",
          borderColor: "rgba(39, 38, 53, 0.1)",
        }}
      >
        <Row>
          <p style={{ color: "gray" }}>Annonser Statistik</p>
          <Row>
            {props.apiData === null
              ? null
              : props.apiData.map((job) => <JobCard key={job.id} job={job} />)}
          </Row>
        </Row>
        <Row style={{ textAlign: "center", paddingTop:"1rem" }}>
          <Col>
            <Button
              variant="secondary"
              size="sm"
              onClick={(e) =>
                props.pageNumber !== 1 && !props.isLoading
                  ? props.recieveDataFromAdCardListChild(props.pageNumber - 1)
                  : null
              }
            >
              Föregående
            </Button>{" "}
            <Button
              variant="secondary"
              size="sm"
              onClick={(e) => !props.isLoading ? props.recieveDataFromAdCardListChild(1) : null}
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
              onClick={(e) => !props.isLoading ?
                props.recieveDataFromAdCardListChild(props.pageNumber + 1) : null
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
