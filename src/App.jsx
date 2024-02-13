import { useCallback, useEffect, useRef, useState } from "react";
import "./styles.css";

export default function App() {
  const [Password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "./&%#@$()_{}[]";
    for (i = 0; i < length; i++) {
      num = Math.floor(Math.random() * str.length);
      pass += str.charAt(num);
    }
    setPassword(pass);
  }, [length, numberAllowed, characterAllowed]);

  const copyPassword = useCallback(() => {
    passwordRef.current.select();
    window.navigator.clipboard.writeText(Password);
  }, [Password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, characterAllowed]);
  return (
    <div className="App">
      <h1>Password Generator</h1>
      <input
        type="text"
        value={Password}
        onChange={(event) => {
          console.log(setName(event.target.value));
        }}
        ref={passwordRef}
      />
      <button
        value="copy"
        onClick={(e) => {
          copyPassword();
        }}
      >
        Copy
      </button>
      <br />
      <input
        type="range"
        value={length}
        onChange={(e) => {
          setLength(e.target.value);
        }}
      />
      <br />
      <input
        type="checkbox"
        value={numberAllowed}
        onClick={() => {
          setNumberAllowed(!numberAllowed);
        }}
      />
      Number
      <input
        type="checkbox"
        value={characterAllowed}
        onClick={() => {
          setCharacterAllowed(!characterAllowed);
        }}
      />
      Character
    </div>
  );
}
