import TodoListItem from './TodoListItem';

const TodoList = ({ todos, setTodos }) => {
  return (
    <ul className='todo-list'>
      {todos.map((todo,index) => (
        <TodoListItem
          key={index}
          index={index}
          todo={todo}
          todos={todos}
          setTodos={setTodos}
        />
      ))}
    </ul>
  );
};

export default TodoList;
