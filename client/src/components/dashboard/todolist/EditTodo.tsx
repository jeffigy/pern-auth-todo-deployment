import React, { useState } from "react";

import {
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
  setTodosChange: (bool: boolean) => void;
}

const EditTodo: React.FC<EditTodoProps> = ({ todo, setTodosChange }) => {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState(todo.description);
  const handleOpen = () => setOpen(!open);

  async function editText(id: number) {
    try {
      const body = { description };
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", localStorage.token);
      // proxy

      await fetch(`/todos/${id}`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(body),
      });
      setTodosChange(true);
      //close modal
      handleOpen();

      // window.location.reload();
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
