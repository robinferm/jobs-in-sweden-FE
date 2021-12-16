import Spinner from "react-bootstrap/Spinner";

const LoadSpinner = () => {
  return (
    <div style={{marginTop: "5rem"}}>
      <Spinner animation="border" size="lg" role="status" variant="info">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};
export default LoadSpinner;