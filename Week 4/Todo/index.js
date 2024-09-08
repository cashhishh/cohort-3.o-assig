const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware to parse JSON

const TODOS_FILE = path.join(__dirname, "todos.json");

// Helper function to read todos from file
const readTodos = () => {
  try {
    const data = fs.readFileSync(TODOS_FILE, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return []; // Return empty array if there's an error (e.g., file doesn't exist)
  }
};

// Helper function to write todos to file
const writeTodos = (todos) => {
  fs.writeFileSync(TODOS_FILE, JSON.stringify(todos, null, 2));
};

// GET /todos - Retrieve all todos
app.get("/todos", (req, res) => {
  const todos = readTodos();
  res.json(todos);
});

// POST /todos - Create a new todo
app.post("/todos", (req, res) => {
  const newTodo = req.body;
  if (!newTodo || !newTodo.text) {
    return res.status(400).json({ error: "Todo text is required" });
  }
  const todos = readTodos();
  newTodo.id = Date.now(); // Simple unique ID
  todos.push(newTodo);
  writeTodos(todos);
  res.status(201).json(newTodo);
});

// DELETE /todos/:id - Delete a todo by ID
app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  let todos = readTodos();
  todos = todos.filter((todo) => todo.id !== id);
  writeTodos(todos);
  res.status(204).end(); // No content
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
