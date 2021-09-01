import React from "react";
import "./App.css";
import Interface from "./components/Interface";

function App() {
  return (
    <div
      style={{ backgroundImage: "url('/background.jpg')" }}
      className="w-screen h-screen bg-no-repeat bg-cover"
    >
      <Interface />
    </div>
  );
}

export default App;
