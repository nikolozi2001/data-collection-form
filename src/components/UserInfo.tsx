import { useState, useEffect } from "react";
import { FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Input, Button, Form } from "antd";

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
        <Form layout="vertical">
          <Form.Item label="User ID">
            <Input
              placeholder="Enter your ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Job Title">
            <Input
              placeholder="Enter your job title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </Form.Item>
          <Button
            type="primary"
            disabled={isNextDisabled}
            onClick={handleNext}
          >
            Next
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default UserInfo;
