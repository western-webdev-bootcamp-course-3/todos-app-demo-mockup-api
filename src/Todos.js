import { useEffect, useState } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import TodoFooter from './components/TodoFooter';
import axios from 'axios';

const Todos = () => {
  // represents the list of todos: an array of objects
  // each object represents a todo item with three fields: id, item, and completed
  // e.g., [{id: 1, item: 'Walk the dog', completed: false}, 
  //        {id: 2, item: 'Wash the dishes', completed: false}]
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // step 1: define the function to fetch todos from the server
    //          and set the todos state
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:8000/todos');
        const data = response.data;
        setTodos(data);
      } catch (error) {
        console.log(error);
      }
    };
    // step 2: call the function immediately
    fetchTodos();
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
