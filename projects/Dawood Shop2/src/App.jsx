import { Outlet } from "react-router";
import { Header } from "./Components/Header";

export const App = () => {


  return (
    <div className="min-h-screen  bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-700">
      <header>
        <Header/>
      </header>
      <main className="">
        <Outlet/>
      </main>
    </div>
  );
};
