import { Routes, Route, useNavigate } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { NotFoundPage } from "./pages/NotFound";
import { LogoutPage } from "./pages/Logout";
import { LoginPage } from "./pages/Login";
import RequireAuth from "./components/RequireAuth";
import useAxiosInterceptor from "./hooks/useAxiosInterceptor";

function App() {
  const navigate = useNavigate();
  useAxiosInterceptor(navigate);
  return (
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
  );
}

export default App;
