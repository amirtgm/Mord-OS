import React, { useContext } from "react";
import { BoxesContext } from "../providers/boxes.provider";

const Dock: React.FC = () => {
  const { openApp } = useContext(BoxesContext);
  return (
    <div className="flex flex-row justify-center w-7/12 h-20 p-2 mx-auto mb-5 rounded-xl frost">
      <div
        onClick={() => openApp()}
        className="w-16 h-16 mx-2 bg-white rounded-xl"
      />
      <div
        onClick={() => openApp()}
        className="w-16 h-16 mx-2 bg-white rounded-xl"
      />
      <div
        onClick={() => openApp()}
        className="w-16 h-16 mx-2 bg-white rounded-xl"
      />
    </div>
  );
};

export default Dock;
