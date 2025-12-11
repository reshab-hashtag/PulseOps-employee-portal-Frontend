import React from "react";
import AppRoutes from "./routes";

const App: React.FC = () => {
  const backendURl = import.meta.env.VITE_BACKEND_URL;
  console.log("Backend URL:", backendURl);
  return <AppRoutes />;
};

export default App;
