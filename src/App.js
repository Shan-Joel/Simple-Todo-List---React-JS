import './App.css';
import TodoList from './TodoList';
import React, {useState, useRef, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
 const [todos, setTodos] = useState([])
 const todoNameRef = useRef();

 useEffect(() => {
  const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) 
  if(storedTodos) setTodos(storedTodos);
 }, [])

 useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
 }, [todos])  

 function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
 }

 function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if(name === '') return;
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null;
 } 

 function handleClearTodos() {
   const newTodos = todos.filter(todo => !todo.complete)
   setTodos(newTodos)
 }
 
 return (
    <>
        <div><h1 className='fw-900'>Todo List App</h1></div>
        <TodoList todos={todos} toggleTodo={toggleTodo}/>
        <input ref={todoNameRef} type="text" />
        <div className='cont'>
          <button onClick={handleAddTodo}>Add Todo</button>
          <button onClick={handleClearTodos}>Clear Todo</button>
        </div>
        <div className='txt-center'>{todos.filter(todo => !todo.complete).length} Left To do</div>
    </>
  );
}

export default App;
