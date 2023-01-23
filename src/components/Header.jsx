import React, { useCallback, useState } from 'react';
import DialogTodoItem from './DialogTodoItem';

const Header = ({ handleSubmit }) => {
    const [isOpen, setIsOpen] = useState(false);

    const open = useCallback(() => setIsOpen(true), [setIsOpen]);
    const close = useCallback(() => setIsOpen(false), [setIsOpen]);

    return (
        <div className="flex justify-center w-2/4">
            <button
                onClick={open}
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-md px-5 py-2"
                >
                Add Task
             </button>

            {isOpen &&
            <DialogTodoItem
                close={close}
                save={handleSubmit}
                />
            }
        </div>
    );
};

export default Header;
