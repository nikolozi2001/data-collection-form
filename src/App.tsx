import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserInfo from "./components/UserInfo";
import TaskDataCollection from "./components/TaskDataCollection";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/tasks" element={<TaskDataCollection />} />
        <Route path="/" element={<UserInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
