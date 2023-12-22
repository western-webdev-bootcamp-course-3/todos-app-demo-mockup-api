import { RxCross2 } from 'react-icons/rx';
import { BsCheckCircle } from 'react-icons/bs';
import { BsCircle } from 'react-icons/bs';
import axios from 'axios';

const TodoListItem = ({ index, todo, todos, setTodos }) => {
  // delete a todo
  const handleDelete = async (id) => {
    const res = await deleteTodoServer(id);
    if (res === 'OK') {
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    }
  };

  // delete a todo from the server
  const deleteTodoServer = async (id) => {
    const response = await axios.delete(`http://localhost:8000/todos/${id}`);
    const status = await response.status;
    if (status === 200) return 'OK';
    return 'ERROR';
  };

  // handle toggle check button
  const handleToggle = async () => {
    let response;
    if (todo.completed) {
      // uncheck
      response = await updateTodoStatusServer(todo.id, false);
    } else {
      // check
      response = await updateTodoStatusServer(todo.id, true);
    }

    const updatedTodo = response.data;
    const updatedTodos = todos.map((todo) => {
      if (todo.id === updatedTodo.id) {
        return response.data;
      } else {
        return todo;
      }
    });
    setTodos(updatedTodos);
  };

  // update the status of a todo on the server
  const updateTodoStatusServer = async (id, newStatus) => {
    const response = axios.patch(`http://localhost:8000/todos/${id}`, {
      completed: newStatus,
    });
    return response;
  };

  return (
    <li style={{ position: 'relative' }}>
      <button style={{ position: 'absolute', left: 10 }} onClick={handleToggle}>
        {todo.completed ? (
          <BsCheckCircle color='green' size={25} />
        ) : (
          <BsCircle color='#e6e6e6' size={25} />
        )}
      </button>
      <label className={todo.completed ? 'deleted' : ''}>{todo.item}</label>
      <button
        style={{ position: 'absolute', right: 10 }}
        onClick={() => handleDelete(todo.id)}
      >
        <RxCross2 color='#cc9a9a' />
      </button>
    </li>
  );
};

export default TodoListItem;
