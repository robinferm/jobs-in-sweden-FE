import "./css/header.css";
import { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Search, XCircleFill } from "react-bootstrap-icons";

const Header = () => {
  const [searchTextInput, setSearchTextInput] = useState("");
  return (
    <Container fluid style={{ height: "30rem", background: "rgb(39, 38, 53)" }}>
      <Row>
        <Col sm style={{ height: "30rem" }}>
          <Col className="header-content">
            <Row>
              <Col
                sm={4}
                className="nonTargetable"
                style={{ textAlign: "left" }}
              >
                <span style={{ color: "white", fontSize: "3rem" }}>JOBB</span>
                <span style={{ color: "#F24C00", fontSize: "3rem" }}>LY</span>
                <span style={{ color: "white", fontSize: "1rem" }}>.se</span>
              </Col>
            </Row>
            <Row className="header-content-text">
              <h1>
                Hitta, jämför och boka tid hos en tandläkare nära dig, smidigt
                och enkelt online!
              </h1>
              <p>
                Hitta tandläkare när dig eller ring vår kundtjänst på
                tandläkare.se så hjälper vi dig att boka
              </p>
            </Row>
            <Row className="header-content-searchbar">
              <p>Hitta yrken nära dig</p>
              <form className="SearchInput">
                <label>
                  {searchTextInput.length > 0 ? (
                    <span
                      onClick={(e) => setSearchTextInput("")}
                      className="header-content-reseticon"
                    >
                      <XCircleFill />
                    </span>
                  ) : (
                    <span className="header-content-searchicon">
                      <Search />
                    </span>
                  )}
                  <input
                    type="text"
                    name="searchInput"
                    autoComplete="off"
                    placeholder={"12121231231"}
                    onChange={(e) => setSearchTextInput(e.target.value)}
                    value={searchTextInput}
                  />
                  <div className="header-content-button">Hitta</div>
                </label>
              </form>
            </Row>
          </Col>
        </Col>
      </Row>
    </Container>
  );
};
export default Header;
