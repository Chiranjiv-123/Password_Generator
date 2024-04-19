import { useCallback, useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState("");
  const passSelect = useRef(null);
  const PasswordGenerator = useCallback(() => {
    let str = "";
    str += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "1234567890";
    if (character) str += "!@#$%^&*(){}[]|?><";
    let pass = "";
    for (let i = 1; i <= length; i++) {
      let randChar = str.charAt(Math.floor(Math.random() * str.length + 1));
      pass += randChar;
    }
    setPassword(pass);
  }, [length, number, character]);

  useEffect(() => {
    PasswordGenerator();
  }, [length, number, character]);

  const copytoClipboard = useCallback(() => {
    passSelect.current.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className="w-full h-96 flex justify-center items-center ">
        <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
          <h1 className="text-4xl text-white text-center mb">
            Password Generator
          </h1>

          <div className=" text-center mt-5 py-4  ">
            <input
              className=" rounded-s-2xl text-xl read-only: px-3 py-2 outline-none"
              type="text"
              value={password}
              ref={passSelect}
              name=""
              id=""
            />
            <button
              onClick={copytoClipboard}
              className="active:bg-orange-700 duration-150 active:text-blue-400 px-3 py-2 rounded-e-2xl text-xl  bg-blue-500 "
            >
              copy
            </button>
            <div className="flex gap-1 justify-center mt-3 text-white">
              <input
                className="cursor-pointer"
                type="range"
                readOnly
                value={length}
                onChange={(e) => {
                  setLength(e.target.value);
                }}
                name=""
                id=""
                min={8}
                max={24}
              />
              <label htmlFor="">Length ({length})</label>
              <input
                type="checkbox"
                defaultChecked={character}
                className="cursor-pointer"
                onChange={() => {
                  setNumber((prev) => !prev);
                }}
                name=""
                id="num_inp"
              />
              <label htmlFor="num_inp"> number</label>

              <input
                type="checkbox"
                className="cursor-pointer"
                defaultChecked={character}
                onChange={() => {
                  setCharacter((prev) => !prev);
                }}
                name=""
                id="char_inp"
              />
              <label htmlFor="char_inp"> Character</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
