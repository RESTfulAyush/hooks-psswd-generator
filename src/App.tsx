import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [isNumAllowed, setIsNumAllowed] = useState(false);
  const [isCharAllowed, setIsCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState("copy");

  const pwdRef = useRef<HTMLInputElement | null>(null);

  const pwdGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (isCharAllowed) str += "!@#$%^&*()_-+=";
    if (isNumAllowed) str += "0123456789";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [isCharAllowed, length, isNumAllowed]);

  const copyText = useCallback(() => {
    pwdRef.current?.select();
    window.navigator.clipboard.writeText(password);
    setCopied("Copied!");

    setTimeout(() => {
      setCopied("Copy");
    }, 2000);
  }, [password]);

  useEffect(() => {
    pwdGenerator();
  }, [length, isCharAllowed, isNumAllowed, pwdGenerator]);

  return (
    <>
      <div className="h-screen flex items-center justify-center bg-gray-800">
        <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 text-white bg-gray-500">
          <h1 className="text-white text-center my-3">
            Random Password Generator
          </h1>
          <div className="flex shadow rounded-lg overflow-hidden mb-4">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-1 px-3 text-black" // Added explicit text and background colors
              placeholder="Password"
              readOnly
              ref={pwdRef}
            />

            <button
              onClick={copyText}
              className={`outline-none text-white px-3 py-0.5 shrink-0 ${
                copied === "Copied!" ? "bg-blue-500" : "bg-blue-700"
              }`}
            >
              {copied}
            </button>
          </div>

          <div className="flex text-sm gap-x-2">
            <div className="flex items-center gap-x-1">
              <input
                type="range"
                min={6}
                max={15}
                value={length}
                className="cursor-pointer"
                onChange={(e) => setLength(Number(e.target.value))}
              />
              <label>Length : {length}</label>
            </div>

            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={isCharAllowed}
                className="cursor-pointer"
                onChange={() => setIsCharAllowed((prev) => !prev)}
              />
              <label>Characters</label>
            </div>

            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={isNumAllowed}
                className="cursor-pointer"
                onChange={() => setIsNumAllowed((prev) => !prev)}
              />
              <label>Numbers</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
