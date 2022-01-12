import { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";

const SavedAds = (props: any) => {
    const [savedAds, setSavedAds] = useState([]);
    const getSavedAds = () => {
        var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
        if(existingEntries !== null){
            setSavedAds(existingEntries);
        }
    };

    useEffect(() => getSavedAds(), [props.savedAdCounter]);

    return(
        <div>{savedAds === undefined ? null : savedAds.map((job: any) => (
                <div key={job}>{job}</div>
        ))}</div>
    )
    };
  export default SavedAds;