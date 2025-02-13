import { useState, useEffect } from "react";

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

type Task = {
  inputs: string[];
  outputs: string[];
};

function TaskDataCollection() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userId, setUserId] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  useEffect(() => {
    setTasks(payload.tasks);
    setUserId(payload.userId);
    setJobTitle(payload.jobTitle);
  }, []);

  // Check if the current task is valid (both inputs and outputs are filled)
  const isCurrentTaskValid = (task: Task) => {
    return task.inputs.length > 0 && task.outputs.length > 0;
  };

  // Check if the "Add new task" button should be enabled
  const isAddTaskDisabled =
    tasks.length === 0 || !isCurrentTaskValid(tasks[tasks.length - 1]);

  // Check if the "Done" button should be enabled
  const isDoneDisabled =
    tasks.length === 0 || tasks.some((task) => !isCurrentTaskValid(task));

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
        .then(() => {
          alert("Form submitted successfully!");
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Form submission failed!");
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
                <select
                  multiple
                  value={task.outputs}
                  onChange={(e) =>
                    handleTaskChange(
                      index,
                      "outputs",
                      Array.from(
                        e.target.selectedOptions,
                        (option) => option.value
                      )
                    )
                  }
                  className="full-width"
                >
                  <option value="SMS Chart">SMS Chart</option>
                  <option value="Email Report">Email Report</option>
                  <option value="Dashboard Report">Dashboard Report</option>
                  <option value="Performance Metrics">
                    Performance Metrics
                  </option>
                </select>
              </span>
              using the
              <span>
                <select
                  multiple
                  value={task.inputs}
                  onChange={(e) =>
                    handleTaskChange(
                      index,
                      "inputs",
                      Array.from(
                        e.target.selectedOptions,
                        (option) => option.value
                      )
                    )
                  }
                  className="full-width"
                >
                  <option value="Customer Tech Pack">Customer Tech Pack</option>
                  <option value="Financial Data">Financial Data</option>
                  <option value="Sales Data">Sales Data</option>
                  <option value="Customer Feedback">Customer Feedback</option>
                </select>
              </span>
            </p>
          </div>
        ))}
        <button
          type="button"
          onClick={addNewTask}
          disabled={isAddTaskDisabled}
          style={{ marginTop: "16px" }}
        >
          Add new task
        </button>
        <button
          type="button"
          disabled={isDoneDisabled}
          onClick={handleDone}
          style={{ marginTop: "16px" }}
        >
          Done
        </button>
      </div>
    </div>
  );
}

export default TaskDataCollection;
