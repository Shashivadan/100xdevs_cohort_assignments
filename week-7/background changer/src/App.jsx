import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [color, setColor] = useState(0);

  return (
    <>
      <div className={`${color} h-screen w-screen `}>
        <div className=" w-11/12 rounded-3xl h-fit  bg-white p-4 fixed bottom-4 left-14 flex gap-3 justify-between">
          <button
            className="h-fit p-4 bg-red-800 rounded-2xl w-40"
            onClick={() => setColor("bg-red-800")}
          >
            red
          </button>
          <button
            className="h-fit p-4  rounded-2xl w-40 bg-lime-400"
            onClick={() => setColor("bg-lime-400")}
          >
            red
          </button>
          <button
            className="h-fit p-4  rounded-2xl w-40 bg-yellow-400"
            onClick={() => setColor("bg-yellow-400")}
          >
            red
          </button>
          <button
            className="h-fit p-4  rounded-2xl w-40 bg-blue-600"
            onClick={() => setColor("bg-blue-600")}
          >
            red
          </button>
          <button
            className="h-fit p-4 rounded-2xl w-40 bg-purple-600"
            onClick={() => setColor("bg-purple-600")}
          >
            purple
          </button>
          <button
            className="h-fit p-4 rounded-2xl w-40 bg-purple-600"
            onClick={() => setColor("bg-purple-600")}
          >
            purple
          </button>
          <button
            className="h-fit p-4 rounded-2xl w-40 bg-purple-600"
            onClick={() => setColor("bg-purple-600")}
          >
            purple
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
