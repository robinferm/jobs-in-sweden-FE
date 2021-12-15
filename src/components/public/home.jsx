import "./css/home.css";
import React, { useState, useEffect } from "react";
import Header from "../common/header.jsx";
import Spinner from "../common/loadspinner.jsx";
import SearchBar from "../common/searchbar.jsx";

const Home = () => {
  const [isLoading, setLoading] = useState(false);
  // const API = "http://82.102.1.109/api/joblistings";
  
  useEffect(() => {
    setLoading(false);
  },[]);

  return (
    <div className="wrapper">
      <Header />
      <SearchBar />
      {isLoading ? <Spinner /> : null}
    </div>
  );
};
export default Home;
