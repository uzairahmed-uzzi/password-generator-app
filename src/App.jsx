import React, { useCallback, useEffect, useRef } from "react";

const App = () => {
  const [length, setLength] = React.useState(8);
  const [numAllowed, setNumAllowed] = React.useState(false);
  const [charAllowed, setCharAllowed] = React.useState(false);
  const [password, setPassword] = React.useState("");
  // useRef hook
  const passRef = useRef(null);
  const copyToClipboard =useCallback(() => {
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+<>?[]{};;";
    for (let i = 1; i <= length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length + 1));
    }
    setPassword(pass);
  }, [charAllowed, numAllowed, length, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [charAllowed, numAllowed, length]);
  return (
    <div className="w-full h-max py-3 box-border max-w-md mx-auto my-8 shadow-md rounded-lg text-center  px-4 text-orange-500 bg-gray-700">
      <h1 className="text-white my-3 text-center">Password Generator</h1>
      <div className="flex rounded-lg shadow overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          ref={passRef}
          placeholder="Password"
          readOnly
          className="outline-none py-1 px-3 w-full"
        />
        <button
          onClick={copyToClipboard}
          className="outline-none bg-yellow-700 text-white py-1 shadow-lg px-3 shrink-0 mx-2 rounded"
        >
          Copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            name="length"
            min="8"
            max="100"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="cursor-pointer outline-none"
            id="length"
          />
          <label htmlFor="length">Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            name="numAllowed"
            defaultChecked={numAllowed}
            onChange={() => setNumAllowed((prev) => !prev)}
            className="cursor-pointer outline-none"
            id="numberInput"
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            name="charAllowed"
            defaultChecked={charAllowed}
            onChange={() => setCharAllowed((prev) => !prev)}
            className="cursor-pointer outline-none"
            id="charInput"
          />
          <label htmlFor="charInput">Characters</label>
        </div>
      </div>
    </div>
  );
};

export default App;
