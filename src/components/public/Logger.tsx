import { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Table from 'react-bootstrap/Table'

const Logger = () => {
  const [logApiData, SetLogApiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const API = "http://82.102.1.109/api/joblistings/searchhistory";
      await fetch(API)
        .then((response) => response.json())
        .then((data) => SetLogApiData(data))
        .catch((err) => console.error(err));
    };
    fetchData();
  }, []);
  return (
    <Container style={{
      fontSize: "12px"
    }}>
    <Table striped bordered hover variant="light" size="sm" responsive="sm"> 
    <thead>
    <tr>
      <th style={{width:"11rem"}}>Date</th>
      <th>Search word</th>
    </tr>
  </thead>
  <tbody>
  {logApiData.slice().reverse().map((log: any) => (
      <tr>
        <th>{log.timeStamp.replace(/T|Z/g, " ")}</th>
        <th>{log.searchstring}</th>
      </tr>
      ))}
  </tbody>
    </Table>
    </Container>
  );
};
export default Logger;
