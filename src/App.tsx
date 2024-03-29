import React, { Suspense, useState } from 'react'
import './App.css';
import { Todo } from './model';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
const InputField = React.lazy(() => import('./components/InputField'))
const TodoList = React.lazy(() => import('./components/TodoList'))

const App: React.FC = () => {
    const [todo, setTodo] = useState<string>('');
    const [todos, setTodos] = useState<Todo[]>([]);
    const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

    const handleAdd = (event: React.FormEvent) => {
        event.preventDefault();
        if (todo) {
            setTodos([...todos, { id: Date.now(), isDone: false, todo }]);
            setTodo('');
        }
        console.log(todos)
    }
    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;
        let add, active = todos, complete = completedTodos;

        if (source.droppableId === 'TodosList') {
            add = active[source.index];
            active.splice(source.index, 1);
        } else {
            add = complete[source.index];
            complete.splice(source.index, 1);
        }

        if (destination.droppableId === 'TodosList') {
            active.splice(destination.index, 0, add);
        } else {
            complete.splice(destination.index, 0, add);
        }

        setCompletedTodos(complete);
        setTodos(active);
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className='App'>
                <span className="heading">Taskify</span>
                <Suspense fallback={<span>Loading...</span>}><InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} /></Suspense>
                <Suspense fallback={<span>Loading...</span>}><TodoList
                    todos={todos}
                    setTodos={setTodos}
                    completedTodos={completedTodos}
                    setCompletedTodos={setCompletedTodos} /></Suspense>
            </div>
        </DragDropContext>
    )
}

export default App
