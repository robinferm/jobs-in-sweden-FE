import "./css/JobCard.css";
import { Col, Row, Accordion, Button } from "react-bootstrap";
import { Star, StarFill } from "react-bootstrap-icons";
import { useState, useEffect } from "react";

const JobCard = (props: any) => {
  const publicationString = props.job.publication_date.replace(/T|Z/g, " ");
  const deadlineString = props.job.deadline.replace(/T|Z/g, " ");
  const [isSaved, setSaved] = useState(false);

  useEffect(() => {
    // @ts-ignore
    var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
    if (existingEntries !== null) {
      if (existingEntries.includes(props.job.id)) {
        setSaved(true);
      } else setSaved(false);
    }
  }, [props.savedAdCounter, isSaved]);

  function toggleLocalStorage(entry: string) {
    // Parse any JSON previously stored in allEntries
    // @ts-ignore
    var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
    if (existingEntries == null) existingEntries = [];

    const index = existingEntries.indexOf(entry);
    if (existingEntries.includes(entry)) {
      existingEntries.splice(index, 1);
    } else {
      localStorage.setItem("entry", JSON.stringify(entry));
      // Save allEntries back to local storage
      existingEntries.push(entry);
    }

    localStorage.setItem("allEntries", JSON.stringify(existingEntries));
  }

  const openInNewTab = (url:string) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const toggleSaved = (e: any, id: string) => {
    e.stopPropagation();
    toggleLocalStorage(id);
    setSaved((prevSaved) => !prevSaved);
    props.savedAdCounter();
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
                <div className="CardDescription">{props.job.employer.name}</div>
              </Row>
              <Row>
                <Col>
                  {" "}
                  <Row>
                    {" "}
                    <div className="CardPublicationDate">
                      Publicerad: {publicationString}
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
          onClick={(e) => toggleSaved(e, props.job.id)}
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
        <Row style={{ height: "5rem" }}>
          <Col sm={8}>
            <p style={{ fontWeight: "600", fontSize: "1rem" }}>
              {props.job.occupation.label}
              <br />
              <span style={{ fontWeight: "400", fontSize: ".75rem" }}>
                {props.job.working_hours_type.label} {props.job.duration.label}
                <br />
                {props.job.salary_type.label}
                {props.job.employer.url !== null ? (
                  <span>
                    <br />
                    Webadress:{" "}
                    <a target="_blank" href={props.job.employer.url}>
                      {props.job.employer.url}
                    </a>
                  </span>
                ) : null}
              </span>
            </p>
          </Col>
          <Col sm={4} style={{ textAlign: "right", paddingTop: "1.5rem" }}>
            <Button
              size="lg"
              variant="outline-dark"
              disabled={props.job.removed}
              onClick={() =>
                openInNewTab(
                  !props.job.application_details.via_af && props.job.application_details.url !== null
                    ? props.job.application_details.url
                    : props.job.webpage_url
                )
              }
            >
              Ansök nu!
            </Button>{" "}
          </Col>
        </Row>
        <Row style={{ marginTop: "2rem", fontSize: ".75rem" }}>
          <Col>{props.job.description.text}</Col>
        </Row>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default JobCard;
