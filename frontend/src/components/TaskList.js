import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onEdit, onDelete, onToggle }) => {
  if (tasks.length === 0) {
    return (
      <div className="task-list">
        <h2>Task List</h2>
        <p>No tasks found.</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
