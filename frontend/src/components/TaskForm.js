import { useEffect, useState } from "react";

const TaskForm = ({ onSubmit, existingTask, onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");

  useEffect(() => {
    if (existingTask) {
      setTitle(existingTask.title);
      setDescription(existingTask.description);
      setPriority(existingTask.priority);
    }
  }, [existingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) {
      alert("Please fill in both title and description");
      return;
    }
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      priority,
    });
    if (!existingTask) {
      setTitle("");
      setDescription("");
      setPriority("low");
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="form-input"
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="form-textarea"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="form-select"
      >
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
      </select>
      <div className="form-buttons">
        <button type="submit" className="form-button">
          {existingTask ? "Update Task" : "Add Task"}
        </button>
        {existingTask && onCancel && (
          <button type="button" onClick={handleCancel} className="form-button cancel">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
