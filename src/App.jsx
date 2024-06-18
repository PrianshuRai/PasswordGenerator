import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

export default function App() {
  const [length, setLength] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [password, setPassword] = useState("");

  const generatePassword = useCallback(() => {
    let char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numbers) char += "1234567890";
    if (symbols) char += "!@#$%^&*()_-+=";
    let pass = "";
    for (let i = 0; i < length; i++) {
      pass += char.charAt(Math.floor(Math.random() * char.length + 1));
    }
    console.log(pass);
    setPassword(pass);
  }, [length, numbers, symbols, password]);

  useEffect(() => {
    generatePassword();
  }, [length, numbers, symbols]);

  const newPassword = useRef(null);

  function copyToClipboard() {
    window.navigator.clipboard.writeText(password);
    newPassword.current?.select();
  }

  return (
    <>
      <div className="flex flex-col bg-slate-700 m-4 p-5 pt-2 rounded-lg text-white">
        <h4 className="flex justify-center text-xl">Password Generator</h4>
        <div className="flex">
          <input
            className="w-full rounded-l-lg p-1 mt-2 text-black"
            type="text"
            placeholder="Password"
            value={password}
            ref={newPassword}
            readOnly
          ></input>
          <span className="absolute right-24 top-[63px] cursor-pointer" onClick={generatePassword}>🔄️</span>
          <button className="bg-blue-500 w-16 mt-2 rounded-r-lg text-white active:before:content-['Copied'] before:content-['Copy']" onClick={copyToClipboard}></button>
        </div>
        <div className="flex justify-evenly">
          <div>
            <input
              className="translate-y-[5px]"
              type="range"
              value={length}
              max={20}
              min={6}
              onChange={(e) => {
                setLength(e.target.value);
                console.log(length);
              }}
            ></input>
            <label className="p-2">Length({length})</label>
          </div>
          <div>
            <input
              type="checkbox"
              defaultChecked={numbers}
              value={numbers}
              onChange={() => setNumbers(!numbers)}
            ></input>
            <label className="p-2">numbers</label>
          </div>
          <div>
            <input
              type="checkbox"
              defaultChecked={symbols}
              value={symbols}
              onChange={() => setSymbols(!symbols)}
            ></input>
            <label className="p-2">symbols</label>
          </div>
        </div>
      </div>
    </>
  );
}
