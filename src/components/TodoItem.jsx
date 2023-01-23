import React, { useCallback, useState } from 'react';
import DialogTodoItem from './DialogTodoItem';

const TodoItem = ({ task, deleteHandler, checkHandler, editHandler }) => {
    const [isEditOpen, setIsEditOpen] = useState(false);

    const openEdit = useCallback(() => setIsEditOpen(true), [setIsEditOpen]);
    const closeEdit = useCallback(() => setIsEditOpen(false), [setIsEditOpen]);

    const onDelete = useCallback(
        () => deleteHandler(task?._id),
        [deleteHandler, task?._id]
    );

    const onCheck = useCallback(
        () => checkHandler(task),
        [checkHandler, task]
    );

    return (
        <div className="flex items-center justify-between bg-white rounded-md px-3 w-full my-2 py-4 shadow-sm">
            <button onClick={onCheck} className={task?.status ? "" : "opacity-40"}>
                <span className="p-1 text-xl text-blue-600">🗹</span>
            </button>
            <div className="flex-1 flex flex-col mx-3">
                <span className={`text-gray-700 font-medium ${task?.status && 'line-through'}`}>
                    {task?.title}
                </span>
                <span className="text-xs text-gray-700">
                    {task?.deadline?.$d?.toLocaleString?.()}
                </span>
            </div>
            <div className="">
                <button
                    onClick={onDelete}
                    className="bg-gray-200 rounded-md p-1 mr-2"
                    >
                    <span className="w-6 h-6 text-gray-800">🗑</span>
                </button>
                <button
                    onClick={openEdit}
                    className="bg-gray-200 rounded-md p-1"
                    >
                    <span className="w-6 h-6 text-gray-800">✎</span>
                </button>
            </div>
            {isEditOpen &&
            <DialogTodoItem
                task={task}
                save={editHandler}
                close={closeEdit}
                />
            }
        </div>
    );
};

export default TodoItem;