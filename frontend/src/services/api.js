import axios from "axios";

const API_URL = "http://localhost:4000/api/tasks";

export const fetchTasks = async () => {
  const response = await axios.get(API_URL);
  return { status: response.status, data: response.data };
};

export const createTask = async (task) => {
  const response = await axios.post(API_URL, task);
  return { status: response.status, data: response.data };
};

export const editTask = async (id, updatedTask) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedTask);
  return { status: response.status, data: response.data };
};

export const deleteTask = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return { status: response.status, data: response.data };
};

export const toggleTaskCompletion = async (id) => {
  const response = await axios.patch(`${API_URL}/${id}/toggle`);
  return { status: response.status, data: response.data };
};
