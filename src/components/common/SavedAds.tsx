import { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";

const SavedAds = (props: any) => {
  const [queryString, setQueryString] = useState("");
  const [savedAdsData, setSavedAdsData] = useState([]);

  const getSavedAds = () => {
    
    if (localStorage.getItem("allEntries") !== null) {
      // Create query string
      // @ts-ignore
        var ids = JSON.parse(localStorage.getItem("allEntries")).map((id: string) => id + "&ids=").join("").slice(0, - 5);
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
      {savedAdsData === undefined || null
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
