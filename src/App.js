import './App.css';
import { observer } from "mobx-react-lite"
import { useState } from 'react';
import myTodoStore from './store/todos';

const App = observer(({ store }) =>  {
  const [todo, setTodo] = useState('');

  const handleChange = e => setTodo(e.target.value);

  const addTodo = e => {
    e.preventDefault();
    myTodoStore.addTodo(todo);

    setTodo('');
    e.target.reset();
  };

  const toggleTodo = id => {
    myTodoStore.toggleTodo(id);
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form onSubmit={addTodo}>
        <input type="text" onChange={handleChange} placeholder='Enter a task...' required/>
      </form>
      <ul>
        {
          myTodoStore.filterTodos.map(todo => {
            return (
              <>
                <li className={`${todo.completed ? 'is-completed' : ''}`} key={todo.id} onClick={() => toggleTodo(todo.id)}>
                  {todo.text}
                </li>
                <button onClick={() => myTodoStore.removeTodo(todo.id)}>X</button>
              </>
            )
          })
        }
      </ul>
      <p>
        {
          myTodoStore.todosCount >= 1 ? `You have ${myTodoStore.todosCount} task left!` : 'No pending tasks!'
        }
        </p>
    </div>
  );
})

export default App;
