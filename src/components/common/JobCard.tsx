import "./css/JobCard.css";
import { Col, Row, Accordion } from "react-bootstrap";
import { Star, StarFill } from "react-bootstrap-icons";
import { useState } from "react";

const JobCard = (props: any) => {
  const publicationString = props.job.publication_date.replace(/T|Z/g, " ");
  const deadlineString = props.job.deadline.replace(/T|Z/g, " ");
  const [isSaved, setSaved] = useState(false);

  const toggleSaved = (e: any) => {
    e.stopPropagation();
    setSaved((prevSaved) => !prevSaved);
  };
  return (
    <Accordion.Item eventKey={props.job.id}>
      <Accordion.Header>
        <div className="Card">
          <Row>
            <Col sm={3}>
              <div className="CardLogo">
                <img alt="" src={props.job.logo_url}></img>
              </div>
            </Col>
            <Col sm={9}>
              <Row>
                <div className="CardTitle">{props.job.headline}</div>
              </Row>
              <Row>
                <div className="CardDescription">
                  {props.job.employer.name}
                </div>
              </Row>
              <Row>
                <Col>
                  {" "}
                  <Row>
                    {" "}
                    <div className="CardPublicationDate">
                      Publicerad: {" "}
                      {publicationString}
                    </div>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <span
          className="SaveIcon"
          style={{ float: "right" }}
          onClick={(e) => toggleSaved(e)}
        >
          {" "}
          {!isSaved ? (
            <Star style={{ fontSize: "24px", margin: "10px" }} />
          ) : (
            <StarFill style={{ fontSize: "24px", margin: "10px" }} />
          )}
        </span>
      </Accordion.Header>
      <Accordion.Body>
        <div className="CardDescription">{props.job.description.text}</div>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default JobCard;
