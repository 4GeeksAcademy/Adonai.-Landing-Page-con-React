// App.jsx
import { useState } from "react";
import "./App.css";

function TodoInput({ onAddTask }) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      onAddTask(inputValue.trim());
      setInputValue(""); // Limpiar input
    }
  };

  return (
    <input
      type="text"
      placeholder="Escribe una tarea y presiona Enter"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={handleKeyDown}
      className="todo-input"
    />
  );
}

function TodoItem({ task, onDelete }) {
  return (
    <li className="todo-item">
      {task}
      <span className="delete-icon" onClick={onDelete}>🗑️</span>
    </li>
  );
}

function TodoList({ tasks, onDeleteTask }) {
  if (tasks.length === 0) {
    return <p className="empty-message">No hay tareas, añadir tareas</p>;
  }

  return (
    <ul className="todo-list">
      {tasks.map((task, index) => (
        <TodoItem key={index} task={task} onDelete={() => onDeleteTask(index)} />
      ))}
    </ul>
  );
}

export default function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (indexToDelete) => {
    setTasks(tasks.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div className="app-container">
      <h1>Lista de Tareas</h1>
      <TodoInput onAddTask={addTask} />
      <TodoList tasks={tasks} onDeleteTask={deleteTask} />
    </div>
  );
}
