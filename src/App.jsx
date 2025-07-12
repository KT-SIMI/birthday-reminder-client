import { Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ErrorBoundary from "../utils/ErrorBoundary";
import BirthdayMessage from "./pages/BirthdayMessage";

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/message" element={<BirthdayMessage />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
