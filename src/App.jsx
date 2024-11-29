import React, { useCallback, useState } from './react';
import Header from './components/Header';
import Todos from './components/Todos';

import './App.css';

const todoData = [
    {
        _id: 1,
        title: 'Read django language book',
        status: false,
        deadline: '2025-01-01T21:00:00',
    },
    {
        _id: 2,
        title: 'Do My Home Work',
        status: true,
        deadline: '2024-09-18T20:00:00',
    },
    {
        _id: 3,
        title: 'create mini project react',
        status: false,
        deadline: '2025-05-18T11:11:00',
    },
];

function App() {
    const [listTasks, setListTasks] = useState(todoData);

    const handleSubmit = useCallback(
        (task) => {
            setListTasks(oldTasks =>
                [...oldTasks.filter(t => t._id !==  task._id), task]
            );
        },
        [setListTasks]
    );

    const handleDelete = useCallback(
        (_id) => {
            setListTasks(oldTasks =>
                oldTasks.filter(t => t._id !==  _id)
            );
        },
        [setListTasks]
    );

    const handleCheck = useCallback(
        (task) => {
            setListTasks(oldTasks =>
                oldTasks.map(
                    t => t._id !== task._id ? t : { ...t, status: !t.status }
                )
            );
        },
        [setListTasks]
    );

    const handleEdit = useCallback(
        (task) => {
            setListTasks(oldTasks =>
                oldTasks.map(t => t._id === task._id ? task : t)
            );
        },
        [setListTasks]
    );

    return (
        <div className="flex flex-col items-center w-full h-full bg-white my-10 gap-6">
            <h1 className="text-4xl font-bold uppercase text-gray-600">ToDo List</h1>
            <Header handleSubmit={handleSubmit}/>
            <Todos 
                tasks={listTasks}
                checkHandler={handleCheck}
                deleteHandler={handleDelete}
                editHandler={handleEdit}
                />
        </div>
    );
};

export default App;
