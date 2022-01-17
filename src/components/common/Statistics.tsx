import { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { StringMappingType } from "typescript";
import VerticalBar from "./StatisticsVerticalBar";

interface Props {
  searchTerm: string;
  searchCount: number;
}

const Statistics = (props: Props) => {
  const [employerStatisticData, setEmployerStatisticData] = useState([]);
  const [categoryStatisticData, setCategoryStatisticData] = useState([]);
  const [searchTermStatistics, setSearchTermStatistics] = useState([]);

  useEffect(() => {
    const fetchEmployerStatistics = async () => {
      const API = "http://82.102.1.109/api/joblistings/employercount";
      await fetch(API)
        .then((response) => response.json())
        .then((data) => setEmployerStatisticData(data))
        .catch((err) => console.error(err));
    };
    const fetchCategoryStatistics = async () => {
      const API = "http://82.102.1.109/api/joblistings/categorycount";
      await fetch(API)
        .then((response) => response.json())
        .then((data) => setCategoryStatisticData(data))
        .catch((err) => console.error(err));
    };

    fetchEmployerStatistics();
    fetchCategoryStatistics();
  }, []);

  useEffect(() => {
    setSearchTermStatistics([]);
    const fetchSerchTermStatistics = async () => {
      const API =
        "http://82.102.1.109/api/joblistings/statistics/" + props.searchTerm;
      await fetch(API)
        .then((response) => response.json())
        .then((data) => setSearchTermStatistics(data.date))
        .catch((err) => console.error(err));
    };
    if (props.searchTerm !== "") fetchSerchTermStatistics();
  }, [props.searchTerm]);

  return (
    <Container>
      <Row>
        <Col sm={12}>
          {props.searchCount > 0 ? (
            <VerticalBar searchTerm={props.searchTerm} searchTermStatistics={searchTermStatistics} />
          ) : null}
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
              {employerStatisticData.slice(0, 5).map((employeer: any) => (
                <Row key={employeer._id} onClick={(e) => console.log("hello")}>
                  <p style={{ fontSize: "12px", textAlign: "left" }}>
                    {employeer._id}{" "}
                    <span style={{ fontWeight: "600" }}>
                      ({employeer.count})
                    </span>
                  </p>
                </Row>
              ))}
            </Col>
            <Col sm={4}>
              {employerStatisticData.slice(5, 10).map((employeer: any) => (
                <Row key={employeer._id}>
                  <p style={{ fontSize: "12px", textAlign: "left" }}>
                    {employeer._id}{" "}
                    <span style={{ fontWeight: "600" }}>
                      ({employeer.count})
                    </span>
                  </p>
                </Row>
              ))}
            </Col>
            <Col sm={4}>
              {employerStatisticData.slice(10, 15).map((employeer: any) => (
                <Row key={employeer._id}>
                  <p style={{ fontSize: "12px", textAlign: "left" }}>
                    {employeer._id}{" "}
                    <span style={{ fontWeight: "600" }}>
                      ({employeer.count})
                    </span>
                  </p>
                </Row>
              ))}
            </Col>
          </Row>
          <Row style={{ textAlign: "center", paddingTop: "2rem" }}>
            <p
              style={{
                color: "darkslategray",
                fontSize: "16px",
                fontWeight: "600",
                textAlign: "left",
              }}
            >
              Populära Kategorier
            </p>
            <Col sm={4}>
              {categoryStatisticData.slice(0, 5).map((category: any) => (
                <Row key={category._id} onClick={(e) => console.log("hello")}>
                  <p style={{ fontSize: "12px", textAlign: "left" }}>
                    {category._id}{" "}
                    <span style={{ fontWeight: "600" }}>
                      ({category.count})
                    </span>
                  </p>
                </Row>
              ))}
            </Col>
            <Col sm={4}>
              {categoryStatisticData.slice(5, 10).map((category: any) => (
                <Row key={category._id}>
                  <p style={{ fontSize: "12px", textAlign: "left" }}>
                    {category._id}{" "}
                    <span style={{ fontWeight: "600" }}>
                      ({category.count})
                    </span>
                  </p>
                </Row>
              ))}
            </Col>
            <Col sm={4}>
              {categoryStatisticData.slice(10, 15).map((category: any) => (
                <Row key={category._id}>
                  <p style={{ fontSize: "12px", textAlign: "left" }}>
                    {category._id}{" "}
                    <span style={{ fontWeight: "600" }}>
                      ({category.count})
                    </span>
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
