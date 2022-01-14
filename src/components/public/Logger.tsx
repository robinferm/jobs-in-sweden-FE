import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Filter from "bad-words";

const Logger = () => {
  const [logApiData, SetLogApiData] = useState([]);
  const filter = new Filter();

  useEffect(() => {
    const fetchData = async () => {
      const API = "http://localhost/api/joblistings/searchhistory";
      await fetch(API)
        .then((response) => response.json())
        .then((data) => SetLogApiData(data))
        .catch((err) => console.error(err));
    };
    fetchData();
  }, []);
  return (
    <Container
      style={{
        fontSize: "12px",
      }}
    >
      <Table striped bordered hover variant="light" size="sm" responsive="sm">
        <thead>
          <tr>
            <th style={{ width: "8rem" }}>Date</th>
            <th>Search word</th>
          </tr>
        </thead>
        <tbody>
          {logApiData
            .slice()
            .reverse()
            .map((log: any) => (
              <tr key={log.id}>
                <th>{log.timeStamp
                .replace(/T|Z/g, " ")
                .substr(0, log.timeStamp.lastIndexOf(":"))
                }</th>
                <th>{filter.clean(log.searchstring)}</th>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};
export default Logger;
