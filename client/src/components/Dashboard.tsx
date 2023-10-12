import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useToast } from "@/components/ui/use-toast";

type DashboardProps = {
  [x: string]: any;
  setAuth: (bool: boolean) => void;
};

const Dashboard: React.FC<DashboardProps> = ({ setAuth }) => {
  const { toast } = useToast();
  const [name, setName] = useState("");

  async function getName() {
    try {
      const response = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      setName(parseRes.user_name);
    } catch (error: any) {
      console.error(error.message);
    }
  }
  const logOut = (e: any) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast({
      title: "Logged out Successfully",
    });
  };

  useEffect(() => {
    getName();
  }, []);

  return (
    <div className="flex-col mx-auto ">
      <p>{name}</p>
      <Button className="bg-blue-600" onClick={(e) => logOut(e)}>
        Logout
      </Button>
    </div>
  );
};
export default Dashboard;
