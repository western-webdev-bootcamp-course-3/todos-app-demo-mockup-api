import { useState } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import TodoFooter from './components/TodoFooter';
import axios from 'axios';
import { useEffect } from 'react';

const Todos = () => {
  // represents the list of todos: an array of objects
  // each object represents a todo item with three fields: id, item, and completed
  // e.g., [{id: 1, item: 'Walk the dog', completed: false},
  //        {id: 2, item: 'Wash the dishes', completed: false}]
  const [todos, setTodos] = useState([]);

  /* functions that deal with the backend data */
  // get all todos from the server
  const getTodoServer = async () => {
    const response = await axios.get('http://localhost:8000/todos');
    const data = await response.data;
    return data;
  };

  /* functions that deal with the frontend states */
  // set the todo list initially
  useEffect(() => {
    getTodoServer().then((data) => setTodos(data));
  }, []);

  return (
    <div className='todos'>
      <TodoInput todos={todos} setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
      <TodoFooter todos={todos} />
    </div>
  );
};

export default Todos;
