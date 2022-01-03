import "./css/AdCardList.css";
import React from "react";
import { Row, Col, Container, Button, Accordion } from "react-bootstrap";
import JobCard from "./JobCard";
import GeneralStatistics from "./GeneralStatistics";

interface AdCardData {
  pageNumber: number;
  isWatchingAdSection: boolean;
  recieveDataFromAdCardListChild: any;
  changeIsWatchingAdSection: any;
  apiData: any;
}

const AdCardList = (props: AdCardData) => {
  return (
    <div>
      <Container className="MainContainer">
        <Row>
          <p style={{ color: "gray" }}>
            {props.isWatchingAdSection ? (
              <div>
                <span
                  style={{ cursor: "pointer", fontWeight: "500" }}
                >
                  Annonser{" "}
                </span>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => props.changeIsWatchingAdSection(false)}
                >
                  Statistik
                </span>
              </div>
            ) : (
              <div>
                <span
                  style={{ cursor: "pointer"}}
                  onClick={() => props.changeIsWatchingAdSection(true)}
                >
                  Annonser{" "}
                </span>
                <span
                  style={{ cursor: "pointer", fontWeight: "500" }}
                >
                  Statistik
                </span>
              </div>
            )}
          </p>
          <Row>
            {props.isWatchingAdSection ? (
              <div>
                <Accordion flush>
                  {props.apiData === null
                    ? null
                    : props.apiData.map((job) => (
                        <JobCard key={job.id} job={job} />
                      ))}
                </Accordion>
                <Row style={{ textAlign: "center", paddingTop: "1rem" }}>
                  <Col>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={(e) =>
                        props.pageNumber !== 1
                          ? props.recieveDataFromAdCardListChild(
                              props.pageNumber - 1
                            )
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
                        props.recieveDataFromAdCardListChild(
                          props.pageNumber + 1
                        )
                      }
                    >
                      Nästa
                    </Button>{" "}
                  </Col>
                </Row>
              </div>
            ) : (
              <GeneralStatistics />
            )}
          </Row>
        </Row>
      </Container>
    </div>
  );
};
export default AdCardList;
