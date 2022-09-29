import Home from "./components/home/Home";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./layout/Nav";
import LoginPage from "./components/login/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import DashboardPage from "./components/dashboard/DashboardPage";
import AddPost from "./components/dashboard/posts/AddPost";
import PostPage from "./components/dashboard/posts/PostPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="dashboard/posts" element={<PostPage />} />
            <Route path="dashboard/posts/add" element={<AddPost />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
