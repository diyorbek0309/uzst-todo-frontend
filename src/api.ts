import axios from "axios";

const api = axios.create({
  baseURL: "https://uzst-todo-backend.herokuapp.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
