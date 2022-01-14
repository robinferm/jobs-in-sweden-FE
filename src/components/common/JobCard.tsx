import "./css/JobCard.css";
import { Col, Row, Accordion } from "react-bootstrap";
import { Star, StarFill } from "react-bootstrap-icons";
import { useState, useEffect } from "react";

const JobCard = (props: any) => {
  const publicationString = props.job.publication_date.replace(/T|Z/g, " ");
  const deadlineString = props.job.deadline.replace(/T|Z/g, " ");
  const [isSaved, setSaved] = useState(false);

  useEffect(() => {
    var existingEntries = localStorage.getItem("allEntries");
    if(existingEntries !== null){
      if(existingEntries.includes(props.job.id)) setSaved(true);
    }
  }, []);


  function toggleLocalStorage(entry: string) {
    // Localstorage is empty
    if(localStorage.getItem("allEntries") == null){
      var arr = [];
      localStorage.setItem("entry", JSON.stringify(entry));
      // Save allEntries back to local storage
      arr.push(entry);
      localStorage.setItem("allEntries", JSON.stringify(arr));
    }
    else{
      var existingEntries = localStorage.getItem("allEntries");
      // If entry exists in localstorage
      // @ts-ignore
      var test = JSON.parse(existingEntries)
      if(test.includes(entry)){      // Compiling error, cant do .includes when it might be null
        // @ts-ignore
        const index = JSON.parse(existingEntries).indexOf(entry)
        console.log(index)
        console.log(existingEntries)
        // @ts-ignore
        var test = JSON.parse(existingEntries).splice(index, 1)
        console.log(test)
        localStorage.setItem("allEntries", JSON.stringify(test));
      }
      // If entry does not exists and should be added
      else{
        // @ts-ignore
        var existingArr = JSON.parse(existingEntries);
        existingArr.push(entry);
        localStorage.setItem("allEntries", JSON.stringify(existingArr));
      }
    }
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
