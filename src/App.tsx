import { useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [isNumber, setIsNumber] = useState(false);
  const [isCharAllowed, isSsCharAllowed] = useState(false);

  return (
    <>
      <h1 className="text-4xl">Random Password Generator</h1>
    </>
  );
}

export default App;
