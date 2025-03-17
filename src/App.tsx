import { useCallback, useEffect, useRef, useState } from "react";
import { Copy, Check, RefreshCw, Shield } from "lucide-react";

function App() {
  const [length, setLength] = useState(8);
  const [isNumAllowed, setIsNumAllowed] = useState(false);
  const [isCharAllowed, setIsCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [strength, setStrength] = useState(0);
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

    // Calculate password strength
    let strengthScore = 0;
    if (length >= 8) strengthScore += 1;
    if (length >= 12) strengthScore += 1;
    if (isNumAllowed) strengthScore += 1;
    if (isCharAllowed) strengthScore += 1;
    setStrength(strengthScore);
  }, [isCharAllowed, length, isNumAllowed]);

  const copyText = useCallback(() => {
    pwdRef.current?.select();
    window.navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [password]);

  useEffect(() => {
    pwdGenerator();
  }, [length, isCharAllowed, isNumAllowed, pwdGenerator]);

  const getStrengthColor = () => {
    switch (strength) {
      case 0:
        return "bg-red-500";
      case 1:
        return "bg-orange-500";
      case 2:
        return "bg-yellow-500";
      case 3:
        return "bg-lime-500";
      case 4:
        return "bg-green-500";
      default:
        return "bg-gray-300";
    }
  };

  const getStrengthText = () => {
    switch (strength) {
      case 0:
        return "Very Weak";
      case 1:
        return "Weak";
      case 2:
        return "Medium";
      case 3:
        return "Strong";
      case 4:
        return "Very Strong";
      default:
        return "N/A";
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-blue-900">
      <div className="w-full max-w-md mx-auto shadow-xl rounded-xl p-6 text-white backdrop-blur-sm bg-white/10">
        <div className="flex items-center justify-center mb-6">
          <Shield className="mr-2 text-purple-300" size={24} />
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300">
            Password Generator
          </h1>
        </div>

        <div className="flex shadow-lg rounded-lg overflow-hidden mb-6 border border-white/20">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-3 px-4 text-gray-800 font-mono text-lg bg-white/90"
            placeholder="Your password"
            readOnly
            ref={pwdRef}
          />
          <button
            onClick={copyText}
            className="outline-none px-4 py-2 bg-purple-600 hover:bg-purple-700 transition-colors duration-300 flex items-center justify-center"
            title={copied ? "Copied!" : "Copy to clipboard"}
          >
            {copied ? <Check size={20} /> : <Copy size={20} />}
          </button>
          <button
            onClick={pwdGenerator}
            className="outline-none px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
            title="Generate new password"
          >
            <RefreshCw size={20} />
          </button>
        </div>

        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span>Password Strength:</span>
            <span className="font-medium">{getStrengthText()}</span>
          </div>
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full ${getStrengthColor()} transition-all duration-300`}
              style={{ width: `${(strength / 4) * 100}%` }}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="flex justify-between">
              <span>Length: {length}</span>
              <span className="text-sm text-blue-300">{length} characters</span>
            </label>
            <input
              type="range"
              min={6}
              max={30}
              value={length}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
              onChange={(e) => setLength(Number(e.target.value))}
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={isNumAllowed}
                  className="sr-only"
                  onChange={() => setIsNumAllowed((prev) => !prev)}
                />
                <div
                  className={`w-10 h-6 ${
                    isNumAllowed ? "bg-purple-600" : "bg-gray-600"
                  } rounded-full transition-colors duration-300`}
                ></div>
                <div
                  className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ${
                    isNumAllowed ? "translate-x-4" : ""
                  }`}
                ></div>
              </div>
              <span>Include Numbers</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={isCharAllowed}
                  className="sr-only"
                  onChange={() => setIsCharAllowed((prev) => !prev)}
                />
                <div
                  className={`w-10 h-6 ${
                    isCharAllowed ? "bg-purple-600" : "bg-gray-600"
                  } rounded-full transition-colors duration-300`}
                ></div>
                <div
                  className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ${
                    isCharAllowed ? "translate-x-4" : ""
                  }`}
                ></div>
              </div>
              <span>Include Symbols</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
