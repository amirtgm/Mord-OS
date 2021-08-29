import React, { useContext } from "react";
import { BoxesContext } from "../providers/boxes.provider";
import { apps } from "../types/apps";

const Dock: React.FC = () => {
  const { openApp } = useContext(BoxesContext);
  return (
    <div className="flex flex-row justify-center w-7/12 h-20 p-2 mx-auto mb-5 rounded-xl frost">
      <div
        onClick={() => openApp({ app: apps.READER })}
        className="w-16 h-16 mx-2 bg-purple-600 rounded-xl"
      />
      <div
        onClick={() => openApp({ app: apps.GALLERY })}
        className="w-16 h-16 mx-2 bg-pink-600 rounded-xl"
      />
      <div
        onClick={() => openApp({ app: apps.BROWSER })}
        className="w-16 h-16 mx-2 bg-yellow-200 rounded-xl"
      />
    </div>
  );
};

export default Dock;
