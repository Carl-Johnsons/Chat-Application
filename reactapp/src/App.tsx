import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { HomePage } from "./pages/Home";
import { NotFoundPage } from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
          errorElement={<NotFoundPage />}
        ></Route>
        <Route
          path="/logout"
          element={<HomePage />}
          errorElement={<NotFoundPage />}
        ></Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
