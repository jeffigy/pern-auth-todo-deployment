import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useToast } from "@/components/ui/use-toast";
import InputTodo from "./todolist/InputTodo";
import ListTodos from "./todolist/ListTodo";

type DashboardProps = {
  [x: string]: any;
  setAuth: (bool: boolean) => void;
};

const Dashboard: React.FC<DashboardProps> = ({ setAuth }) => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [allTodos, setAllTodos] = useState([]);
  const [todosChange, setTodosChange] = useState(false);

  const getProfile = async () => {
    try {
      const res = await fetch("/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseData = await res.json();

      setAllTodos(parseData);

      setName(parseData[0].user_name);
      // console.log(parseData)
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const logOut = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast({
      title: "Logged out",
      description: "You have been logged out",
      duration: 5000,
    });
  };

  useEffect(() => {
    getProfile();
    setTodosChange(false);
  }, [todosChange]);

  return (
    <div className="flex-col mx-auto p-10 ">
      <div className="flex justify-between mb-5 ">
        <h1 className="text-3xl font-bold">Welcome back {name}</h1>
        <Button onClick={(e) => logOut(e)}>Log out</Button>
      </div>
      <div className="flex">
        <InputTodo setTodosChange={setTodosChange} />
      </div>
      <div className="flex">
        <ListTodos allTodos={allTodos} setTodosChange={setTodosChange} />
      </div>
    </div>
  );
};
export default Dashboard;
