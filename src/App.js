import './App.css';
import { observer } from "mobx-react-lite"
import { useState } from 'react';
import myTodoStore from './store/todos';
import { Button, Alert, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Checkbox } from '@mui/material';

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
    <div
      className="App"
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', mx: 'auto'}}
    >
      <h1 variant="h1">Todo List</h1>
      <form onSubmit={addTodo}>
        <input type="text" onChange={handleSetTodo} placeholder='Enter a task...' required/>
      </form>

      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', mx: 'auto'}} >
        {
          myTodoStore.todos.map((todo) => {
            return (
              <>
                <ListItem
                  className={`${todo.completed ? 'is-completed' : ''}`}
                  key={todo.id}
                  disablePadding
                >
                  <ListItemButton role={undefined} dense>
                    <ListItemIcon>
                      <Checkbox
                        onClick={() => myTodoStore.toggleTodo(todo.id)} 
                        edge="start"
                        checked={todo.completed}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': todo.id }} />
                    </ListItemIcon>
                    <ListItemText id={todo.id} primary={todo.text} />
                  </ListItemButton>
                </ListItem>
                <form
                  onSubmit={(e) => editTodos(e, todo.id)}
                  className={todo.isEditable ? 'is-editable' : 'is-not-editable'}
                >
                  <input
                    placeholder="Edit task..."
                    id="standard-basic" label="Standard"
                    variant="standard"
                    onChange={handleEditTodo}
                    type="text"
                    required 
                  />
                </form>
                  <Button
                    variant='contained'
                    color='info'
                    sx={{ m: 1 }}
                    onClick={() => myTodoStore.toggleEdit(todo.id)}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="contained"
                    color="error"
                    sx={{ m: 1 }}
                    onClick={() => myTodoStore.removeTodo(todo.id)}
                  >
                    Delete
                  </Button>
              </>
            );
           }
          )
        }
      </List>
  
      <>
        {
          myTodoStore.todosCount >= 1
            ? <Alert sx={{maxWidth: 360, mx: 'auto' }} severity="warning" color="warning">You have { myTodoStore.todosCount } task left!</Alert> 
            : <Alert sx={{maxWidth: 360, mx: 'auto' }} severity="success" color="success">No pending tasks!</Alert>
        }
      </>
    </div>
  );
})

export default App;
