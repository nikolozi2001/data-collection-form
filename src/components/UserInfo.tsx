import { useState, useEffect } from "react";
import { FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const payload = {
  userId: "JohnSmith123",
  jobTitle: "Merchant",
};

function UserInfo() {
  const [userId, setUserId] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setUserId(payload.userId);
    setJobTitle(payload.jobTitle);
  }, []);

  const isNextDisabled = userId === "" || jobTitle === "";

  const handleNext = () => {
    navigate("/tasks");
  };

  return (
    <div className="container">
      <div className="form">
        <FaEnvelope className="icon large" />
        <h2>Tell us about yourself</h2>
        <div className="input-group">
          <label>User ID</label>
          <input
            type="text"
            placeholder="Enter your ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Job Title</label>
          <input
            type="text"
            placeholder="Enter your job title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </div>
        <button type="button" disabled={isNextDisabled} onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
}

export default UserInfo;
