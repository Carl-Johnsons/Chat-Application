import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div id="error-page">
        <h1>The requested resource not found!</h1>
        <Link to={"/"}>Return to home page</Link>
      </div>
    </>
  );
};

export default NotFound;
