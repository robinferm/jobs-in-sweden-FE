import "./css/jobcard.css"
import { Link } from 'react-router-dom';

const JobCard = (props) => {
    const publicationString = props.job.publication_date.replace(/T|Z/g, " ");

    return (
        <div className="Card">
            <div className="CardTitle"><Link to={props.job.id}>{props.job.headline}</Link></div>
            <div className="CardDescription">{props.job.description.text === null ? null : null}</div>
            <div className="CardDescription">{props.job.ort}</div>
            <div className="CardPublicationDate">Skapad: {publicationString}</div>
        </div>
    )
} 

export default JobCard;