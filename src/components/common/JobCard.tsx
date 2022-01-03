import "./css/JobCard.css";
import { Accordion } from "react-bootstrap";
import { Star, StarFill } from "react-bootstrap-icons";
import {useState} from "react";

const JobCard = (props) => {
  const publicationString = props.job.publication_date.replace(/T|Z/g, " ");
  const [isSaved, setSaved] = useState("false");

  const toggleSaved = (e) => {
    e.stopPropagation();
    setSaved(!isSaved);
  };
  return (
    <Accordion.Item eventKey={props.job.id}>
      <Accordion.Header>
        <div className="Card">
          <span className="SaveIcon" style={{float: "right"}} onClick={(e) => toggleSaved(e)}>{isSaved ? <Star/> : <StarFill/>}</span>
          <div className="CardTitle">{props.job.headline}</div>
          <div className="CardDescription">
            {props.job.description.conditions}
          </div>
          <div className="CardPublicationDate">{publicationString}</div>
        </div>
      </Accordion.Header>
      <Accordion.Body>
        <div className="CardDescription">{props.job.description.text}</div>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default JobCard;
