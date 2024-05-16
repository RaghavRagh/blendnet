import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import WatchlistPage from "./pages/WatchlistPage";

function App() {
  return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
        </Routes>
      </Router>
  );
}

export default App;
