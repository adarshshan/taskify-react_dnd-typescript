import React, { Suspense, useState } from 'react'
import './App.css';
// import InputField from './components/InputField';
import { Todo } from './model';
// import TodoList from './components/TodoList';
const InputField = React.lazy(() => import('./components/InputField'))
const TodoList = React.lazy(() => import('./components/TodoList'))

const App: React.FC = () => {
    const [todo, setTodo] = useState<string>('');
    const [todos, setTodos] = useState<Todo[]>([]);

    const handleAdd = (event: React.FormEvent) => {
        event.preventDefault();
        if (todo) {
            setTodos([...todos, { id: Date.now(), isDone: false, todo }]);
            setTodo('');
        }
        console.log(todos)
    }

    return (
        <div className='App'>
            <span className="heading">Taskify</span>
            <Suspense fallback={<span>Loading...</span>}><InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} /></Suspense>
            <Suspense fallback={<span>Loading...</span>}><TodoList todos={todos} setTodos={setTodos} /></Suspense>
        </div>
    )
}

export default App
