import React from 'react';
import Task from './TodoItem';

const Tasks = ({ tasks, deleteHandler, checkHandler, editHandler }) => {
    return (
        <div className="flex flex-col items-center rounded-lg bg-gray-100 w-2/4 p-5">
            {tasks?.map?.((task, i) => (
                <Task
                    key={i} 
                    task={task}
                    deleteHandler={deleteHandler}
                    checkHandler={checkHandler}
                    editHandler={editHandler}
                    />
            )) ?? ""}
            {((tasks?.length ?? 0) === 0 &&
            <div className="flex flex-col items-center w-2/5 bg-gray-300 font-medium rounded p-2">
                No Todo Found!
            </div>
            )}
        </div>
    );
};

export default Tasks;