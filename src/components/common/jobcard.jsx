import "./css/jobcard.css"
import { Link } from 'react-router-dom';

const JobCard = (props) => {
    return (
        <div className="Card">
            <div className="CardTitle"><Link to={props.job.id}>{props.job.headline}</Link></div>
            <div className="CardDescription">{props.job.description === null ? null : null}</div>
            <div className="CardDescription">{props.job.ort}</div>
            <div className="CardPublicationDate">Skapad: {props.job.publication_date}</div>
        </div>
    )
} 

export default JobCard;