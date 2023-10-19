import React, { useState } from "react";

import {
    Button as MaterialButton,
    Dialog as MaterialDialog,
    DialogHeader as MaterialDialogHeader,
    DialogBody as MaterialDialogBody,
    DialogFooter as MaterialDialogFooter,
    Input as MaterialInput,
    Button,
} from "@material-tailwind/react";

interface EditTodoProps {
    todo: {
        description: string;
        todo_id: number;
    };
}

const EditTodo: React.FC<EditTodoProps> = ({ todo }) => {
    const [open, setOpen] = useState(false);
    const [description, setDescription] = useState(todo.description);
    const handleOpen = () => setOpen(!open);

    async function editText(id: number) {
        try {
            const body = { description };
            const res = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            window.location.reload();
        } catch (err: any) {
            console.error(err.message);
        }
    }
    return (
        <>
            <Button onClick={handleOpen} className="bg-yellow-700">
                Edit
            </Button>
            <MaterialDialog open={open} handler={handleOpen}>
                <MaterialDialogHeader>Edit Todo</MaterialDialogHeader>
                <MaterialDialogBody divider>
                    <MaterialInput
                        type="text"
                        label="Description"
                        crossOrigin="anonymous"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </MaterialDialogBody>
                <MaterialDialogFooter>
                    <Button
                        onClickCapture={() => setDescription(todo.description)}
                        variant="text"
                        color="gray"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button
                        variant="gradient"
                        color="gray"
                        onClick={() => editText(todo.todo_id)}
                    >
                        <span>Submit</span>
                    </Button>
                </MaterialDialogFooter>
            </MaterialDialog>
        </>
    );
};

export default EditTodo;