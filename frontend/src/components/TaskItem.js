const TaskItem = ({ task, onDelete, onToggle, onEdit }) => {
  if (!task || !task.id) {
    console.error('TaskItem received invalid task:', task);
    return null;
  }

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <span className={`priority ${task.priority}`}>{task.priority}</span>
      <button onClick={() => onToggle(task.id)}>
        {task.completed ? "Mark as Incomplete" : "Mark as Complete"}
      </button>
      <button onClick={() => onEdit(task)}>Edit</button>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
};

export default TaskItem;
