import React from "react";
import { Button } from "./ui/button";

type LoginProps = {
  [x: string]: any;
  setAuth: (bool: boolean) => void;
};

const Login: React.FC<LoginProps> = ({ setAuth }) => {
  return (
    <div>
      login
      <Button onClick={() => setAuth(true)}>Login</Button>
    </div>
  );
};
export default Login;
