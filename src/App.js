import Home from "./components/home/Home";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./layout/Nav";
import LoginPage from "./components/login/LoginPage";

function App() {
  return (
    <Router>
      <Navigation />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
