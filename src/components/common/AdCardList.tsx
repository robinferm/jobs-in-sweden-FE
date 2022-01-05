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
          {props.isWatchingAdSection ? (
            <div>
              <span
                style={{
                  color: "gray",
                  cursor: "pointer",
                  fontSize: "12px",
                  borderBottom: "2px solid rgba(54, 174, 243)",
                  display: "inline-block",
                  height: "2rem",
                }}
              >
                Annonser
              </span>
              <span
                style={{
                  color: "gray",
                  cursor: "pointer",
                  fontSize: "12px",
                  display: "inline-block",
                  height: "2rem",
                  marginLeft: "0.5rem",
                }}
                onClick={() => props.changeIsWatchingAdSection(false)}
              >
                Statistik
              </span>
              <span
                style={{
                  width: "96%",
                  color: "gray",
                  borderTop: "1px solid #dfdfdf",
                  display: "inline-block",
                  height: "2rem",
                }}
              ></span>
            </div>
          ) : (
            <div>
              <span
                style={{
                  color: "gray",
                  cursor: "pointer",
                  fontSize: "12px",
                  display: "inline-block",
                  height: "1.5rem",
                }}
                onClick={() => props.changeIsWatchingAdSection(true)}
              >
                Annonser{" "}
              </span>
              <span
                style={{
                  color: "gray",
                  cursor: "pointer",
                  fontSize: "12px",
                  borderBottom: "2px solid rgb(54, 174, 243)",
                  display: "inline-block",
                  height: "2rem",
                  marginLeft: "0.5rem",
                }}
              >
                Statistik
              </span>
              <span
                style={{
                  width: "96%",
                  color: "gray",
                  borderTop: "1px solid #dfdfdf",
                  display: "inline-block",
                  height: "1.5rem",
                }}
              ></span>
            </div>
          )}
          <Row>
            {props.isWatchingAdSection ? (
              <div>
                <Accordion flush>
                  {props.apiData === null
                    ? null
                    : props.apiData.map((job: any) => (
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
