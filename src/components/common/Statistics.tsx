import { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import VerticalBar from "./StatisticsVerticalBar";

interface Props {
  searchBarText: string;
}

const Statistics = (props: Props) => {
  const [employerData, setEmployerData] = useState([]);

  useEffect(() => {
    const fetchEmployerData = async () => {
      const API = "http://82.102.1.109/api/joblistings/employercount/";
      await fetch(API)
        .then((response) => response.json())
        .then((data) => setEmployerData(data))
        .catch((err) => console.error(err));
    };
    fetchEmployerData();
  }, []);

  return (
    <Container>
      <Row>
        <Col sm={12}>
          <VerticalBar searchString={props.searchBarText} />
          <Row style={{ textAlign: "center", paddingTop: "2rem" }}>
            <p
              style={{
                color: "darkslategray",
                fontSize: "16px",
                fontWeight: "600",
                textAlign: "left",
              }}
            >
              Populära arbetsgivare
            </p>
            <Col sm={4}>
              {employerData.slice(0, 5).map((employeer: any) => (
                <Row key={employeer._id} onClick={(e) => console.log("hello")}>
                  <p style={{ fontSize: "12px", textAlign: "left" }}>
                  {employeer._id} <span style={{fontWeight:"600"}}>({employeer.count})</span>
                  </p>
                </Row>
              ))}
            </Col>
            <Col sm={4}>
              {employerData.slice(5, 10).map((employeer: any) => (
                <Row key={employeer._id}>
                  <p style={{ fontSize: "12px", textAlign: "left" }}>
                    {employeer._id} <span style={{fontWeight:"600"}}>({employeer.count})</span>
                  </p>
                </Row>
              ))}
            </Col>
            <Col sm={4}>
              {employerData.slice(10, 15).map((employeer: any) => (
                <Row key={employeer._id}>
                  <p style={{ fontSize: "12px", textAlign: "left" }}>
                  {employeer._id} <span style={{fontWeight:"600"}}>({employeer.count})</span>
                  </p>
                </Row>
              ))}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
export default Statistics;
