import './App.css';
import { observer } from "mobx-react-lite"
import { useState } from 'react';
import myTodoStore from './store/todos';

const App = observer(() =>  {
  const [todo, setTodo] = useState('');
  const [editTodo, setEditTodo] = useState('');

  const addTodo = e => {
    e.preventDefault();
    myTodoStore.addTodo(todo);

    setTodo('');
    e.target.reset();
  };

  const editTodos = (e, id) => {
    e.preventDefault();
    
    myTodoStore.editTodos(id, editTodo);
    myTodoStore.toggleEdit(id);
    e.target.reset();
  }

  const handleSetTodo = e => setTodo(e.target.value);
  const handleEditTodo = e => setEditTodo(e.target.value);

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form onSubmit={addTodo}>
        <input type="text" onChange={handleSetTodo} placeholder='Enter a task...' required/>
      </form>

      <ul>
        {
          myTodoStore.todos.map(todo => {
            return (
              <>
                <li
                  className={`${todo.completed ? 'is-completed' : ''}`}
                  key={todo.id} 
                  onClick={() => myTodoStore.toggleTodo(todo.id)}
                >
                  {todo.text}
                </li>

                <form
                  onSubmit={(e) => editTodos(e, todo.id)}
                  className={todo.isEditable ? 'is-editable' : 'is-not-editable'}
                >
                  <input
                    onChange={handleEditTodo}
                    type="text" 
                    placeholder='Edit task...' 
                    required
                  />
                </form>
                

                <button 
                  onClick={() => myTodoStore.toggleEdit(todo.id)}>Edit</button>
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
