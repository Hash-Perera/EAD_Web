import Spinner from "react-bootstrap/Spinner";

function InnerLoader({ loading }) {
  if (!loading) {
    return null;
  }
  return <Spinner animation="grow" />;
}

export default InnerLoader;
