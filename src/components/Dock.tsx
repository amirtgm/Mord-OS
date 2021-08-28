import React from "react";

const Dock: React.FC = () => {
  return (
    <div className="flex flex-row justify-center w-7/12 h-20 p-2 mx-auto mb-5 rounded-xl frost">
      <div className="w-16 h-16 mx-2 bg-white rounded-xl"></div>
      <div className="w-16 h-16 mx-2 bg-white rounded-xl"></div>
      <div className="w-16 h-16 mx-2 bg-white rounded-xl"></div>
    </div>
  );
};

export default Dock;
