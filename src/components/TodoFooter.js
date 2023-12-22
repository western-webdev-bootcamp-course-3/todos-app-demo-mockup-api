const TodoFooter = ({ todos }) => {
  return (
    <div className='footer'>
      <span className='todo-count'>
        {todos.filter((todo) => todo.completed === false).length} items left
      </span>
    </div>
  );
};

export default TodoFooter;
