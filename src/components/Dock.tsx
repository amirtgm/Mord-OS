import React, { useContext } from "react";
import { BoxesContext } from "../providers/boxes.provider";
import { apps } from "../types/apps";

const Dock: React.FC = () => {
  const { openApp } = useContext(BoxesContext);
  return (
    <div className="flex flex-row justify-center h-20 p-2 mx-auto mb-5 rounded-xl frost">
      <img
        src="/reader.png"
        alt=""
        onClick={() => openApp({ app: apps.READER })}
        className="w-16 h-16 mx-2 cursor-pointer "
      />
      <img
        src="/gallery.png"
        alt=""
        onClick={() => openApp({ app: apps.GALLERY })}
        className="w-16 h-16 mx-2 cursor-pointer "
      />
      <img
        src="/browser.png"
        alt=""
        onClick={() => openApp({ app: apps.BROWSER })}
        className="w-16 h-16 mx-2 cursor-pointer "
      />
    </div>
  );
};

export default Dock;
