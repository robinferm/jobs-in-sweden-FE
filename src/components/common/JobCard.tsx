import "./css/JobCard.css";
import { Accordion } from "react-bootstrap";

const JobCard = (props) => {
  const publicationString = props.job.publication_date.replace(/T|Z/g, " ");

  return (
    <Accordion.Item eventKey={props.job.id}>
      <Accordion.Header>
        <div className="Card">
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
