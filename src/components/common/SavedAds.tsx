import { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";

const SavedAds = (props: any) => {
  const [queryString, setQueryString] = useState("");
  const [savedAdsData, setSavedAdsData] = useState([]);

  const getSavedAds = () => {
    // Get ad ids from local storage
    var existingEntries = JSON.parse(localStorage.getItem("allEntries") || '{}');
    if (existingEntries !== null) {
      // Create query string
      var ids = existingEntries.map((id: string) => id + "&ids=").join("");

      setQueryString(ids);
    }
  };

  const getAdsData = () => {
    if (queryString !== undefined) {
      const API = "http://localhost/api/joblistings/?ids=" + queryString;
      fetch(API)
        .then((response) => response.json())
        .then((data) => setSavedAdsData(data))
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => getSavedAds(), [props.savedAdCounter]);

  useEffect(() => getAdsData(), [queryString]);
  return (
    <div>
      {queryString === null 
        ? null
        : savedAdsData.map((job: any) => (
            <div key={job.id} onClick={() => console.log(job.headline)}>
              {job.headline}
            </div>
          ))}
    </div>
  );
};
export default SavedAds;
