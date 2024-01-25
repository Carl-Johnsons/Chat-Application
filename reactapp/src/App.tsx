import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes/routes";

function App() {
  return (
    <Router>
      <Routes>
        {routes.map((route, index) => {
          const path = route.path;
          const element = route.element;
          const errorElement = route.errorElement;
          return (
            <Route
              key={index}
              path={path}
              element={element}
              errorElement={errorElement}
            ></Route>
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
