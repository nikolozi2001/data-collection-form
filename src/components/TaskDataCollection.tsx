import { useState, useEffect } from "react";
import { Select, Button, message } from "antd";

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

function TaskDataCollection() {
  const [tasks, setTasks] = useState([{ inputs: [], outputs: [] }]);
  const [userId, setUserId] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  useEffect(() => {
    setTasks(payload.tasks);
    setUserId(payload.userId);
    setJobTitle(payload.jobTitle);
  }, []);

  const isAddTaskDisabled = tasks.some(
    (task) => task.inputs.length === 0 || task.outputs.length === 0
  );
  const isDoneDisabled = tasks.some(
    (task) => task.inputs.length === 0 || task.outputs.length === 0
  );

  const handleTaskChange = (
    index: number,
    field: "inputs" | "outputs",
    value: string[]
  ) => {
    const newTasks = [...tasks];
    newTasks[index][field] = value;
    setTasks(newTasks);
  };

  const addNewTask = () => {
    setTasks([...tasks, { inputs: [], outputs: [] }]);
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
                  mode="multiple"
                  value={task.outputs}
                  onChange={(value) =>
                    handleTaskChange(index, "outputs", value)
                  }
                  className="full-width"
                >
                  <Option value="SMS Chart">SMS Chart</Option>
                  <Option value="Email Report">Email Report</Option>
                  <Option value="Dashboard Report">Dashboard Report</Option>
                  <Option value="Performance Metrics">
                    Performance Metrics
                  </Option>
                </Select>
              </span>
              using the
              <span>
                <Select
                  mode="multiple"
                  value={task.inputs}
                  onChange={(value) =>
                    handleTaskChange(index, "inputs", value)
                  }
                  className="full-width"
                >
                  <Option value="Customer Tech Pack">
                    Customer Tech Pack
                  </Option>
                  <Option value="Financial Data">Financial Data</Option>
                  <Option value="Sales Data">Sales Data</Option>
                  <Option value="Customer Feedback">
                    Customer Feedback
                  </Option>
                </Select>
              </span>
            </p>
          </div>
        ))}
        <Button
          type="dashed"
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

export default TaskDataCollection;
