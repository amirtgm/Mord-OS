import React, { useState, useEffect, useCallback } from "react";
import dayjs from "dayjs";
import Logo from "./Logo";

const TopBar: React.FC = () => {
  const [time, setTime] = useState(dayjs().format("ddd MMM D HH:mm:ss A"));

  const renderTime = useCallback(() => {
    requestAnimationFrame(renderTime);
    setTime(dayjs().format("ddd MMM D HH:mm:ss A"));
  }, []);

  useEffect(() => {
    renderTime();
  }, [renderTime]);
  return (
    <div className="w-screen h-auto p-2">
      <div className="flex flex-row justify-between w-full h-8 px-2 text-white bg-white rounded-lg frost">
        <div className="flex">
          <Logo className="w-10 h-10 text-white" />
          <span className="inline-block p-1 ml-2 cursor-pointer">File</span>
          <span className="inline-block p-1 ml-2 cursor-pointer">Edit</span>
          <span className="inline-block p-1 ml-2 cursor-pointer">View</span>
          <span className="inline-block p-1 ml-2 cursor-pointer">Help</span>
        </div>
        <div className="flex">
          <span className="p-1">{time}</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
