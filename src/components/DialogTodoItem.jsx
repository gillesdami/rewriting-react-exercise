import React, { useCallback } from 'react';

const DialogTodoItem = ({ task, close, save }) => {
    const submitHandler = useCallback(
        (e) => {
            e.preventDefault();
            console.log(e);
            save({
                _id: task?._id ?? Math.random(),
                title: e.target.elements.title.value,
                status: e.target.elements.status.checked,
                deadline: e.target.elements.deadline.value,
            })
            close();
        },
        [save, close, task?._id]
    );

    return (
        <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full bg-black bg-opacity-40 flex">
            <div className="relative p-4 bg-white flex w-fit h-fit">
                <form onSubmit={submitHandler}>
                    <h2 className="text-center">Task</h2>
                    <div className="flex flex-col">
                        <div className="flex items-center m-2">
                            <label htmlFor="title" className="min-w-20">Title</label>
                            <input
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                                id="title"
                                name="title"
                                label="Title"
                                defaultValue={task?.title ?? ""}
                                required
                                />
                        </div>
                        <div className="flex items-center m-2">
                            <label htmlFor="status" className="min-w-20">Status</label>
                            <input
                                id="status"
                                name="status"
                                type="checkbox"
                                defaultChecked={task?.status}
                                />
                        </div>
                        <div className="flex items-center m-2">
                            <label htmlFor="deadline" className="min-w-20">Deadline</label>
                            <input
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                                id="deadline"
                                name="deadline"
                                type="datetime-local"
                                defaultValue={task?.deadline ?? ""}
                                required
                                />
                        </div>
                    </div>
                    <div className="flex mt-4 gap-4 justify-end">
                        <button
                            onClick={close}
                            className="bg-gray-300 hover:bg-gray-200 text-gray-600 font-medium rounded-md px-5 py-2"
                            >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-md px-5 py-2"
                            >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DialogTodoItem;