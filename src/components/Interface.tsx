import React from "react";
import AppContainer from "./AppContainer";
import AppWindow from "./AppWindow";
import Dock from "./Dock";
import TopBar from "./TopBar";

// the second root of the OS after APP
const Interface: React.FC = () => {
  return (
    <div className="flex flex-col justify-between w-screen h-screen">
      <TopBar />
      {/* Content Area */}
      <div className="relative flex-auto">
        <AppContainer />
      </div>
      <Dock />
    </div>
  );
};

export default Interface;
