import "./css/JobCard.css";
import { Col, Row, Accordion } from "react-bootstrap";
import { Star, StarFill } from "react-bootstrap-icons";
import { useState, useEffect } from "react";

const JobCard = (props: any) => {
  const publicationString = props.job.publication_date.replace(/T|Z/g, " ");
  const [isSaved, setSaved] = useState(false);

  useEffect(() => {
    // @ts-ignore
    var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
    if(existingEntries !== null){
      if(existingEntries.includes(props.job.id)) setSaved(true);
    }
  }, []);

  function toggleLocalStorage(entry: string) {
    // Parse any JSON previously stored in allEntries
    // @ts-ignore
    var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
    if(existingEntries == null) existingEntries = [];

    const index = existingEntries.indexOf(entry)
    if(existingEntries.includes(entry)){
      existingEntries.splice(index, 1)
    }
    else{
      localStorage.setItem("entry", JSON.stringify(entry));
      // Save allEntries back to local storage
      existingEntries.push(entry);
    }

    localStorage.setItem("allEntries", JSON.stringify(existingEntries));
  };

  const toggleSaved = (e: any, id: string) => {
    e.stopPropagation();
    toggleLocalStorage(id)
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
        <div className="CardDescription">{props.job.description.text}</div>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default JobCard;
