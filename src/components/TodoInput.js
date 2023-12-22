import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const TodoInput = ({ todos, setTodos }) => {
  const [newTodo, setNewTodo] = useState('');

  const handleChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleKeyPress = async (event) => {
    if (event.key === 'Enter' && newTodo.trim() !== '') {
      const newTodoStored = await addTodoServer(newTodo);
      setTodos([...todos, newTodoStored]);
      setNewTodo('');
    }
  };

  /* functions that deal with the backend data */
  // add a new todo to the server
  const addTodoServer = async (newTodo) => {
    const response = await axios.post('http://localhost:8000/todos', {
      id: uuidv4(), // generate a random id
      item: newTodo,
      completed: false,
    });
    const data = await response.data;
    return data;
  };

  return (
    <div className='todo-input'>
      <input
        type='text'
        placeholder='What needs to be done?'
        value={newTodo}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
};

export default TodoInput;
