
import React, { useState } from 'react';


// start with 5 empty strings
const ToDoList = () => {
  const [todos, setTodos] = useState(Array(5).fill(''));

 
  const handleInputChange = (event, index) => {
    const newTodos = [...todos]; 
    newTodos[index] = event.target.value;
    setTodos(newTodos);
  };

  // Add a new empty string
  const handleAddTodo = () => {
    setTodos([...todos, '']);
  };

  return (
    <div className="container">
      <h2>To-Do List</h2>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <input type="text" value={todo} onChange={(event) => handleInputChange(event, index)} />
          </li>
        ))}
      </ul>
      <button onClick={handleAddTodo}>Add Item</button>
    </div>
  );
};

export default ToDoList;
