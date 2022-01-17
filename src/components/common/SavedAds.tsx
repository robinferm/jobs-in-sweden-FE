import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { TrashFill, Star } from "react-bootstrap-icons";

const SavedAds = (props: any) => {
  const [queryString, setQueryString] = useState("");
  const [savedAdsData, setSavedAdsData] = useState([]);

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

  const deleteSavedAd = (e: any, id: string) => {
    e.stopPropagation();
    toggleLocalStorage(id);
    props.savedAdCounter();
  };

  const getSavedAds = () => {
    // Get ad ids from local storage
    // @ts-ignore
    var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
    if (existingEntries !== null) {
      // Create query string
      var ids = existingEntries
        .map((id: string) => id + "&ids=")
        .join("")
        .slice(0, -5);

      setQueryString(ids);
    }
  };

  const getAdsData = () => {
    if (queryString !== undefined) {
      const API = "http://82.102.1.109/api/joblistings/?ids=" + queryString;
      fetch(API)
        .then((response) => response.json())
        .then((data) => setSavedAdsData(data))
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => getSavedAds(), [props.savedAdCounter]);
  useEffect(() => getAdsData(), [queryString]);
  return (
    <>
      {savedAdsData.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "11px" }}>
          Hittade inga sparade annonser
          <br />
          Använd <Star /> för att markera dina favoritannonser
        </p>
      ) : savedAdsData === undefined || null ? null : (
        savedAdsData.map((job: any) => (
          <Row
            key={job.id}
            style={{
              paddingBottom: "0.2rem",
              fontSize: "11px",
              cursor: "pointer",
            }}
          >
            <Col sm={10}>
              <div>
                {job.headline.length < 35
                  ? job.headline
                  : job.headline.substring(0, 35) + "..."}
              </div>
            </Col>
            <Col
              sm={2}
              style={{ textAlign: "right" }}
              onClick={(e) => deleteSavedAd(e, job.id)}
            >
              <TrashFill />
            </Col>
          </Row>
        ))
      )}
    </>
  );
};
export default SavedAds;
