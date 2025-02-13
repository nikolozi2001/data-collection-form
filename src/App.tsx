import "./App.css";
import { useState, useEffect } from "react";
import { FaEnvelope } from "react-icons/fa";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { Input, Button, Select, Form, message } from "antd";

const { Option } = Select;

const payload = {
  userId: "JohnSmith123",
  jobTitle: "Merchant",
  tasks: [
    {
      outputs: ["SMS Chart"],
      inputs: ["Customer Tech Pack"],
    },
    {
      outputs: ["Email Report"],
      inputs: ["Financial Data"],
    },
    {
      outputs: ["Dashboard Report", "Performance Metrics"],
      inputs: ["Sales Data", "Customer Feedback"],
    },
  ],
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

function TaskDataCollection() {
  const [tasks, setTasks] = useState([{ input: "", output: "" }]);
  const [userId, setUserId] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  useEffect(() => {
    setTasks(
      payload.tasks.map((task) => ({
        input: task.inputs.join(", "),
        output: task.outputs.join(", "),
      }))
    );
    setUserId(payload.userId);
    setJobTitle(payload.jobTitle);
  }, []);

  const isAddTaskDisabled = tasks.some(
    (task) => task.input === "" || task.output === ""
  );
  const isDoneDisabled = tasks.some(
    (task) => task.input === "" || task.output === ""
  );

  const handleTaskChange = (
    index: number,
    field: "input" | "output",
    value: string
  ) => {
    const newTasks = [...tasks];
    newTasks[index][field] = value;
    setTasks(newTasks);
  };

  const addNewTask = () => {
    setTasks([...tasks, { input: "", output: "" }]);
  };

  const handleDone = () => {
    if (window.confirm("Are you sure you want to submit?")) {
      const data = {
        userId,
        jobTitle,
        tasks,
      };
      fetch("https://api.example.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          message.success("Form submitted successfully!");
        })
        .catch((error) => {
          console.error("Error:", error);
          message.error("Form submission failed!");
        });
    }
  };

  return (
    <div className="container">
      <div className="form">
        <h2>Task Data Collection</h2>
        {tasks.map((task, index) => (
          <div key={index} className="task-group">
            <p>
              {index + 1} I create the
              <span>
                <Select
                  value={task.output}
                  onChange={(value) =>
                    handleTaskChange(index, "output", value)
                  }
                  className="full-width"
                >
                  <Option value="">Select Output</Option>
                  <Option value="output1">Output 1</Option>
                  <Option value="output2">Output 2</Option>
                </Select>
              </span>
              using the
              <span>
                <Select
                  value={task.input}
                  onChange={(value) =>
                    handleTaskChange(index, "input", value)
                  }
                  className="full-width"
                >
                  <Option value="">Select Input</Option>
                  <Option value="input1">Input 1</Option>
                  <Option value="input2">Input 2</Option>
                </Select>
              </span>
            </p>
          </div>
        ))}
        <Button
          type="dashed"
          disabled={isAddTaskDisabled}
          onClick={addNewTask}
        >
          Add new task
        </Button>
        <Button
          type="primary"
          disabled={isDoneDisabled}
          onClick={handleDone}
        >
          Done
        </Button>
      </div>
    </div>
  );
}

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
