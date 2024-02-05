import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { NotFoundPage } from "./pages/NotFound";
import { LogoutPage } from "./pages/Logout";
import { LoginPage } from "./pages/Login";
import RequireAuth from "./Components/RequireAuth";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/logout" element={<LogoutPage />}></Route>
        {/* Protected Route */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<HomePage />}></Route>
        </Route>
        {/* Match any */}
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
