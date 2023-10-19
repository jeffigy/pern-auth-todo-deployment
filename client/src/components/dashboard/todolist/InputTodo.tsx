import React, { useState } from "react";

type InputTodoProps = {
    setTodosChange: (bool: boolean) => void;
};

const InputTodo: React.FC<InputTodoProps> = ({ setTodosChange }) => {
    const [description, setDescription] = useState("");

    const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("token", localStorage.token);
            const body = { description };
            const response = await fetch("http://localhost:5000/dashboard/todos", {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(body),
            });
            await response.json();
            setTodosChange(true);
            setDescription("");
            // console.log(parseRes);
        } catch (error: any) {
            console.error(error.message);
        }
    };
    return (
        <form className="mx-auto flex flex-col space-y-2" onSubmit={onSubmitForm}>
            <label htmlFor="description">Input Todo</label>

            <input
                id="description"
                type="text"
                className="border border-gray-700 rounded-md w-[500px] p-1"
                value={description}
                placeholder="e.g. feed the dogs"
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <div className="mx-auto">
                <button className="px-3 py-1 bg-teal-700 rounded-md text-white">
                    Add
                </button>
            </div>
        </form>
    );
};
export default InputTodo;