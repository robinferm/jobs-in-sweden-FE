import "./css/AdCardList.css";
import React from "react";
import { Row, Container } from "react-bootstrap";
import JobCardDefaultOpen from "./JobCardDefaultOpen";

interface Props {
  callbackChangeisWatchingSingleAdFalse: any;
  singleAdData: any;
  savedAdCounter: any;
}

const SingleAdList = (props: Props) => {
  return (
    <div>
      <Container className="MainContainer">
        <Row>
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
              onClick={() => props.callbackChangeisWatchingSingleAdFalse()}
            >
              Tillbaka
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
            {props.singleAdData === null
              ? null
              : props.singleAdData.map((job: any) => (
                  <JobCardDefaultOpen
                    savedAdCounter={props.savedAdCounter}
                    key={job.id}
                    job={job}
                  />
                ))}
        </Row>
      </Container>
    </div>
  );
};
export default SingleAdList;
