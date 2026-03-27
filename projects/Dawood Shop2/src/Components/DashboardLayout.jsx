import { Outlet } from "react-router";
import { Header } from "../Components/Header";
import { Sidebar } from "../Components/Sidebar";
import { useState } from "react";
import { Dashboard } from "../Pages/Dashboard";

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [ newRecord,setNewRecord ] = useState(false)

  return (
    <div>
      {/* SIDEBAR */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* MAIN AREA */}
      <div className="flex flex-col h-full  ">

        {/* HEADER */}
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}

          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* SCROLLABLE CONTENT ONLY */}
        <main className="flex-1 md:pl-72 md:pt-20   ">
          {/* <Dashboard 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          /> */}
          <Outlet
            context={{
              activeTab,
              setActiveTab,
              newRecord,
              setNewRecord
            }}
          />
         
        </main>
      </div>
      
    </div>
  );
};
