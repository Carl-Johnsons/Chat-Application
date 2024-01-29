import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import routes from "./routes/routes";
import { getLocalStorageItem } from "./Utils/LocalStorageUtils";

function App() {
  const isAuth = getLocalStorageItem("isAuthenticated");
  return (
    <Router>
      <Routes>
        {routes.map((route, index) => {
          const path = route.path;
          const element = route.element;
          const errorElement = route.errorElement;
          console.log({ isAuth });

          // If not login and the route need authen to access then kick back to the login page
          if (route.auth && !isAuth) {
            return (
              <Route
                key={index}
                path={path}
                element={<Navigate to="/login" />}
                errorElement={errorElement}
              ></Route>
            );
          }

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
