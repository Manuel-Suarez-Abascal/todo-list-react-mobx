import { makeAutoObservable } from 'mobx';

class TodoStore {
    todos = [];

    constructor() {
        makeAutoObservable(this);
    }

    get todosCount() {
        return this.todos.length;
    }

    addTodo(todo) {
        this.todos.push({
            id: Math.floor(Math.random() * 1000),
            text: todo,
            completed: false,
            isEditable: false
        });
    }

    editTodos(id, text) {
        this.todos = this.todos.map(todo => {
            if (todo.id === id) {
                todo.text = text;
            }
            return todo;
        });
    }

    removeTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
    }

    toggleEdit(id) {
        this.todos = this.todos.map(todo => {
            if (todo.id === id) {
                todo.isEditable = !todo.isEditable;
            }
            return todo;
        });
    }

    toggleTodo(id) {
        this.todos = this.todos.map(todo => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }
            return todo;
        });
    }
}

const myTodoStore = new TodoStore();

export default myTodoStore;
