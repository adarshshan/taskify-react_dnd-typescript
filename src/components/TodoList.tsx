import React from 'react'
import { Todo } from '../model';
import SingleTodo from './SingleTodo';
import { Droppable } from 'react-beautiful-dnd';

interface Props {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    completedTodos: Todo[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList: React.FC<Props> = ({ todos, setTodos, completedTodos, setCompletedTodos }) => {
    return (
        <div className="container">
            <Droppable droppableId='TodosList'>
                {
                    (provided, snapshot) => (
                        <div className={`todos ${snapshot.isDraggingOver ? 'dragactive' : ''}`}
                            ref={provided.innerRef}
                            {...provided.droppableProps}>
                            <span className="todos__heading">  Acive Tasks </span>
                            {
                                todos?.map((item, index) => (
                                    <SingleTodo
                                        index={index}
                                        key={item.id}
                                        todo={item}
                                        todos={todos}
                                        setTodos={setTodos} />
                                ))}
                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>
            <Droppable droppableId='TodosRemove'>
                {(provided, snapshot) => (
                    <div className={`todos ${snapshot.isDraggingOver ? 'dragcomplete' : 'remove'}`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}>
                        <span className="todos__heading">  Completed Tasks </span>
                        {
                            completedTodos?.map((item, index) => (
                                <SingleTodo
                                    index={index}
                                    key={item.id}
                                    todo={item}
                                    todos={completedTodos}
                                    setTodos={setCompletedTodos} />
                            ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

        </div>
    )
}

export default TodoList
