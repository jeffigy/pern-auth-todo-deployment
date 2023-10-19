import React, { useEffect, useState } from "react";
import { Button, Card, Typography } from "@material-tailwind/react";
import EditTodo from "./EditTodo";

type ListTodosProps = {
    allTodos: any;
};


const TABLE_HEAD = ["Description", "", ""];

const ListTodos: React.FC<ListTodosProps> = ({ allTodos }) => {
    const [todos, setTodos] = useState([]);
    console.log(allTodos);


    //* delete todo
    async function deleteTodo(id: any) {
        try {
            await fetch(`http://localhost:5000/dashboard/todos/${id}`, {
                method: "DELETE",
                headers: { token: localStorage.token }
            });

            setTodos(todos.filter((todo: any) => todo.todo_id !== id));
        } catch (err: any) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        setTodos(allTodos);
    }, [allTodos]);

    console.log(todos);

    // console.log(todos);
    return (
        <Card className="h-full w-full overflow-scroll">
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                            <th
                                key={head}
                                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                            >
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {todos.length !== 0 && todos[0].todo_id !== null && todos.map((todo: any) => (
                        <tr key={todo.id}>
                            <td>{todo.description}</td>
                            <td>
                                <EditTodo
                                    todo={{
                                        description: todo.description,
                                        todo_id: todo.todo_id,
                                    }}
                                />
                            </td>
                            <td>
                                <Button

                                    className="bg-red-900"
                                    onClick={() => deleteTodo(todo.todo_id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </Card>
    );
};
export default ListTodos;