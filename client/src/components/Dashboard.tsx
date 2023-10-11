import React from "react";

type DashboardProps = {
  [x: string]: any;
  setAuth: (bool: boolean) => void;
};

const Dashboard: React.FC<DashboardProps> = () => {
  return <div>dashboard</div>;
};
export default Dashboard;
