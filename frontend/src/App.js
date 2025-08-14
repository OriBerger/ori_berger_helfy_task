import { useEffect, useState } from "react";
import TaskFilter from "./components/TaskFilter";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import {
  createTask,
  deleteTask,
  editTask,
  fetchTasks,
  toggleTaskCompletion,
} from "./services/api";
import "./styles/App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    try {
      setLoading(true);
      const loadTasks = async () => {
        const result = await fetchTasks();
        setTasks(result.data);
      };
      loadTasks();
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCreateTask = async (taskData) => {
    try {
      const { data: newTask } = await createTask(taskData);
      setTasks((tasks) => [...tasks, newTask]);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleEditTaskSubmit = async (id, updatedTaskData) => {
    try {
      const { data: updatedTask } = await editTask(id, updatedTaskData);
      setTasks((tasks) =>
        tasks.map((task) => (task.id === id ? updatedTask : task))
      );
      setEditingTask(null);
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleToggleTaskCompletion = async (id) => {
    try {
      const result = await toggleTaskCompletion(id);
      setTasks((prevTasks) => 
        prevTasks.map((task) => (task.id === id ? result.data : task))
      );
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  if (loading) {
    return <div className="App">Loading...</div>;
  }

  return (
    <div className="App">
      <div className="container">
        <h1>Task Manager</h1>
        <TaskForm 
          onSubmit={editingTask ? handleEditTaskSubmit.bind(null, editingTask.id) : handleCreateTask}
          existingTask={editingTask}
          onCancel={editingTask ? handleCancelEdit : undefined}
        />
        <TaskFilter filter={filter} setFilter={setFilter} />
        <TaskList
          tasks={filteredTasks}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onToggle={handleToggleTaskCompletion}
        />
      </div>
    </div>
  );
};

export default App;
