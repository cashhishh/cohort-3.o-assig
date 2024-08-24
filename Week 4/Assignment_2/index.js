#!/usr/bin/env node

const { Command } = require("commander");
const program = new Command();
const fs = require("fs");
const path = require("path");

const todosFilePath = path.resolve("todos.json");

function readTodos() {
  if (!fs.existsSync(todosFilePath)) {
    return [];
  }
  const data = fs.readFileSync(todosFilePath, "utf8");
  return JSON.parse(data);
}

function writeTodos(todos) {
  fs.writeFileSync(todosFilePath, JSON.stringify(todos, null, 2), "utf8");
}

program
  .command("add <task>")
  .description("Add a new to-do")
  .action((task) => {
    const todos = readTodos();
    const newTodo = { id: Date.now(), task, completed: false };
    todos.push(newTodo);
    writeTodos(todos);
    console.log(`Added new to-do: "${task}"`);
  });

program
  .command("delete <id>")
  .description("Delete a to-do by ID")
  .action((id) => {
    const todos = readTodos();
    const updatedTodos = todos.filter((todo) => todo.id !== parseInt(id, 10));
    writeTodos(updatedTodos);
    console.log(`Deleted to-do with ID: ${id}`);
  });

program
  .command("update <id> <task>")
  .description("Update a to-do by ID")
  .action((id, task) => {
    const todos = readTodos();
    const updatedTodos = todos.map((todo) => {
      if (todo.id === parseInt(id, 10)) {
        return { ...todo, task };
      }
      return todo;
    });
    writeTodos(updatedTodos);
    console.log(`Updated to-do with ID: ${id} to "${task}"`);
  });

program
  .command("list")
  .description("List all to-dos")
  .action(() => {
    const todos = readTodos();
    if (todos.length === 0) {
      console.log("No to-dos found.");
    } else {
      todos.forEach((todo) => {
        console.log(`[${todo.id}] ${todo.task} (Completed: ${todo.completed})`);
      });
    }
  });

program.parse(process.argv);
