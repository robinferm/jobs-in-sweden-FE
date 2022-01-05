import "./css/Header.css";
import { Container, Col, Row } from "react-bootstrap";
import { Search, XCircleFill, Sliders } from "react-bootstrap-icons";

interface HeaderData {
    adCount: number;
    searchBarText: string;
    searchBarResult: any;
    newSearch: any;
}

const Header = (props:HeaderData) => {

  const adCountString = `Sök yrke bland ${props.adCount} annonser`;
  return (
    <Container fluid style={{ height: "23rem", background: "rgb(39, 38, 53)" }}>
      <Row>
        <Col sm style={{ height: "20rem"}}>
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
                Se statistik och lediga jobb över hela Sverige!
              </h1>
              <p>
                Hitta din nästa <span style={{color: "rgba(242, 76, 0, 1)", fontWeight:"700"}}>drömarbetsplats </span> 
                med ett fåtal klick och se<br/>vilka <span style={{color: "rgba(242, 76, 0, 1)", fontWeight:"700"}}>yrken </span>
                arbetsmarknaden skriker efter just nu
              </p>
            </Row>
            <Row className="header-content-searchbar">
              <form className="SearchInput" onSubmit={(e) => props.newSearch(e)}>
                <label>
                  {props.searchBarText.length > 0 ? (
                    <span
                      onClick={(e) => props.searchBarResult("")}
                      className="header-content-reseticon"
                      title="Radera text"
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
                    placeholder={props.adCount === 0 ? undefined : adCountString}
                    onChange={(e) => props.searchBarResult(e.target.value)}
                    value={props.searchBarText}
                  />
                  <span className="header-content-filtericon" title="Filtrera sökresultat" ><Sliders/></span>
                  <div className="header-content-button" onClick={(e) => props.newSearch(e)} title="Påbörja sökning">Sök</div>
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
