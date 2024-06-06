import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, name: 'Example Todo 1', description: 'This is the description for Example Todo 1', status: 'not completed' },
    { id: 2, name: 'Example Todo 2', description: 'This is the description for Example Todo 2', status: 'completed' }
  ]);
  const [todoName, setTodoName] = useState('');
  const [todoDescription, setTodoDescription] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  const addTodo = () => {
    if (todoName.trim() !== '') {
      const newTodo = {
        id: Date.now(), 
        name: todoName,
        description: todoDescription,
        status: 'not completed'
      };
      setTodos([...todos, newTodo]);
      setTodoName('');
      setTodoDescription('');
    }
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
  };

  const updateStatus = (id, newStatus) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, status: newStatus };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const editTodo = (id, name, description) => {
    setEditingTodoId(id);
    setEditedName(name);
    setEditedDescription(description);
  };

  const saveTodo = (id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, name: editedName, description: editedDescription };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setEditingTodoId(null);
  };

  const filterTodos = (todo) => {
    if (statusFilter === 'all') return true;
    return todo.status === statusFilter;
  };

  return (
    <div className="container">
      <div className="add-todo-container">
        <h1>My Todo</h1>
        <div className="input-container">
          <input
            type="text"
            value={todoName}
            placeholder="Todo Name"
            onChange={(e) => setTodoName(e.target.value)}
          />
          <input
            type="text"
            value={todoDescription}
            placeholder="Todo Description"
            onChange={(e) => setTodoDescription(e.target.value)}
          />
          <button onClick={addTodo}>Add Todo</button>
        </div>
        <div className="status-filter-container">
          <label>Status Filter: </label>
          <select className="status-filter" onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="not completed">Not Completed</option>
          </select>
        </div>
      </div>
      <div className="todo-container">
        {todos.filter(filterTodos).map(todo => (
          <div className="todo-card" key={todo.id}>
            {editingTodoId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
                <input
                  type="text"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                />
                <button onClick={() => saveTodo(todo.id)}>Save</button>
              </>
            ) : (
              <>
                <h3>{todo.name}</h3>
                <p>{todo.description}</p>
                <p>Status: {<select value={todo.status} onChange={(e) => updateStatus(todo.id, e.target.value)}>
                  <option value="completed">Completed</option>
                  <option value="not completed">Not Completed</option>
                </select>}</p>
                <button onClick={() => editTodo(todo.id, todo.name, todo.description)}>Edit</button>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoApp;