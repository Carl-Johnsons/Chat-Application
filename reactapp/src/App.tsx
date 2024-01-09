import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import NavBar from "./Components/NavBar/NavBar";
function App() {
  return (
    <>
      <div className="left d-flex">
        <div className="navbar-section">
          <NavBar />
        </div>
      </div>
      <div className="right d-flex"></div>
    </>
  );
}

export default App;
