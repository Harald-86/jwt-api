import Home from "./components/home/Home";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./layout/Nav";
import LoginPage from "./components/login/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
