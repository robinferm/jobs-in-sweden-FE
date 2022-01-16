import "./css/AdCardList.css";
import React from "react";
import {
  Row,
  Col,
  Container,
  Button,
  Accordion,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import JobCard from "./JobCard";
import Statistics from "./Statistics";
import { useState } from "react";

interface AdCardData {
  pageNumber: number;
  isWatchingAdSection: boolean;
  recieveDataFromAdCardListChild: any;
  changeIsWatchingAdSection: any;
  changeIsSearching: any;
  apiData: any;
  isSearching: boolean;
  isLoading: boolean;
  savedAdCounter: any;
  searchBarText: string;
}

const AdCardList = (props: AdCardData) => {
  const [pageSize, setPageSize] = useState<string | null>("5");
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
              {props.isSearching && !props.isLoading ? (
                <span
                  style={{
                    color: "gray",
                    cursor: "pointer",
                    fontSize: "12px",
                    display: "inline-block",
                    height: "2rem",
                    float: "right",
                    paddingTop: "0.25rem",
                    paddingRight: "1.75rem",
                  }}
                  onClick={() => props.changeIsSearching()}
                >
                  Rensa sökning
                </span>
              ) : null}
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
              {props.isSearching && !props.isLoading ? (
                <span
                  style={{
                    color: "gray",
                    cursor: "pointer",
                    fontSize: "12px",
                    display: "inline-block",
                    height: "2rem",
                    float: "right",
                    paddingTop: "0.25rem",
                    paddingRight: "1.75rem",
                  }}
                  onClick={() => props.changeIsSearching()}
                >
                  Rensa sökning
                </span>
              ) : null}
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
                <Row style={{textAlign:"right", paddingRight:"1.3rem"}}>
                <Col>
                <span style={{fontSize:"11px"}}>Antal annonser per sida</span>
                    <DropdownButton
                      size="sm"
                      id="dropdown-basic-button"
                      variant="secondary"
                      title={pageSize}
                      onSelect={(e) => setPageSize(e)}
                    >
                      <Dropdown.Item eventKey="5">5</Dropdown.Item>
                      <Dropdown.Item eventKey="10">10</Dropdown.Item>
                      <Dropdown.Item eventKey="20">20</Dropdown.Item>
                    </DropdownButton>
                  </Col>
                </Row>
                <Accordion flush>
                  {props.apiData === null
                    ? null
                    : props.apiData.map((job: any, index: string) =>
                        pageSize !== null && index >= pageSize ? null : (
                          <JobCard
                            savedAdCounter={props.savedAdCounter}
                            key={job.id}
                            job={job}
                          />
                        )
                      )}
                </Accordion>
                <Row style={{ textAlign: "center", paddingTop: "1rem" }}>
                  <Col sm={12}>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={(e) =>
                        props.pageNumber !== 1 && !props.isLoading
                          ? props.recieveDataFromAdCardListChild(
                              props.pageNumber - 1
                            )
                          : null
                      }
                    >
                      Föregående
                    </Button>{" "}
                    {props.pageNumber !== 1 ? (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={(e) => props.recieveDataFromAdCardListChild(1)}
                      >
                        1
                      </Button>
                    ) : null}{" "}
                    <Button variant="primary" size="sm">
                      {props.pageNumber}
                    </Button>{" "}
                    <Button variant="secondary" size="sm" onClick={(e) => props.recieveDataFromAdCardListChild(props.pageNumber + 1)}>
                      {props.pageNumber + 1}
                    </Button>{" "}
                    <Button variant="secondary" size="sm" onClick={(e) => props.recieveDataFromAdCardListChild(props.pageNumber + 2)}>
                      {props.pageNumber + 2}
                    </Button>{" "}
                    <Button variant="secondary" size="sm" onClick={(e) => props.recieveDataFromAdCardListChild(props.pageNumber + 3)}>
                      {props.pageNumber + 3}
                    </Button>{" "}
                    {props.pageNumber === 1 ? (
                      <Button variant="secondary" size="sm" onClick={(e) => props.recieveDataFromAdCardListChild(props.pageNumber + 4)}>
                        {props.pageNumber + 4}
                      </Button>
                    ) : null}{" "}
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={(e) =>
                        !props.isLoading
                          ? props.recieveDataFromAdCardListChild(
                              props.pageNumber + 1
                            )
                          : null
                      }
                    >
                      Nästa
                    </Button>{" "}
                  </Col>
                </Row>
              </div>
            ) : (
              <Statistics searchBarText={props.searchBarText} />
            )}
          </Row>
        </Row>
      </Container>
    </div>
  );
};
export default AdCardList;
