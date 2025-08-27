import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/custom/Header";
import { Toaster } from "sonner";

function App() {
  return (
    <div>
      <Header />
      <Outlet />
      <Toaster />
    </div>
  );
}

export default App;
