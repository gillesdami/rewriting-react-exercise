import React, { useState, useCallback } from '../react';
import dayjs from 'dayjs';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { v4 as uuid } from 'uuid';

const DialogTodoItem = ({ task, close, save }) => {
    const [isDateOpen, isSetDateOpen] = useState(false);
    const [deadline, setDeadline] = useState(task?.deadline ?? dayjs());

    const submitHandler = useCallback(
        (e) => {
            e.preventDefault();
            console.log(e);
            save({
                _id: task?._id ?? uuid(),
                title: e.target.elements.title.value,
                status: e.target.elements.status.value,
                deadline: deadline
            })
            close();
        },
        [save, close, deadline, task?._id]
    );

    return (
        <Dialog open={true} onClose={close} fullWidth={true} maxWidth="xs">
            <form onSubmit={submitHandler}>
                <DialogTitle>Task</DialogTitle>
                    <DialogContent className="my-2">
                        <Box
                            noValidate
                            autoComplete="off"
                            sx={{ '& .MuiTextField-root': { my: 2.5 } }}
                            >
                            <TextField
                                name="title"
                                autoFocus
                                label="Title"
                                type="text"
                                defaultValue={task?.title ?? ""}
                                fullWidth
                                required
                                />
                            <TextField
                                name="status"
                                select
                                label="Status"
                                defaultValue={task?.status ?? false}
                                fullWidth
                                required
                                >
                                <MenuItem value={false}>Incompelete</MenuItem>
                                <MenuItem value={true}>Compeleted</MenuItem>
                            </TextField>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    label="Date&Time picker"
                                    open={isDateOpen}
                                    onOpen={() => isSetDateOpen(true)}
                                    onClose={() => isSetDateOpen(false)}
                                    value={deadline}
                                    onChange={setDeadline}
                                    renderInput={
                                        (params) =>
                                            <TextField
                                                fullWidth
                                                {...params}
                                                onClick={() => isSetDateOpen(true)}
                                                />
                                    }
                                    />
                            </LocalizationProvider> 
                        </Box>
                    </DialogContent>
                <DialogActions>
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
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default DialogTodoItem;