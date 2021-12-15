import Spinner from "react-bootstrap/Spinner";

const LoadSpinner = () => {
  return (
    <div>
      <Spinner animation="border" size="lg" role="status" variant="info">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};
export default LoadSpinner;