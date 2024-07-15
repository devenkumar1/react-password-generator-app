import { useState, useCallback, useEffect, useRef } from 'react';
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [lengthVal, setLengthVal] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [spclCharAllowed, setSpclCharAllowed] = useState(false);

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let text = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const number = "1234567890";
    const spclChar = "!@#$%^&*?><,.";

    if (spclCharAllowed) {
      text += spclChar;
    }
    if (numberAllowed) {
      text += number;
    }

    for (let i = 0; i < lengthVal; i++) {
      pass += text.charAt(Math.floor(Math.random() * text.length));
    }
    setPassword(pass);
  }, [lengthVal, spclCharAllowed, numberAllowed]);

  useEffect(() => {
    generatePassword();
  }, [lengthVal, numberAllowed, spclCharAllowed, generatePassword]);

  const copyFunc = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, lengthVal);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className="main-con" style={{ backgroundColor: "#212121" }}>
        <div className='h-24 text-center text-white'>
          <h1 className='p-5 font-serif text-2xl font-bold text-yellow-300'>Password Manager App</h1>
          <br />
          <input
            type="text"
            disabled
            className='w-4/12 h-10 text-black bg-white rounded-2xl'
            value={password}
            ref={passwordRef}
          />
          <button
            className='w-16 p-2 text-center bg-blue-500 rounded-2xl hover:bg-blue-700 hover:scale-105'
            onClick={copyFunc}
          >
            Copy
          </button>
          <br />
          <label>Length</label>
          <input
            type="range"
            max={40}
            min={8}
            value={lengthVal}
            onChange={(e) => setLengthVal(Number(e.target.value))}
          />
          Value: {lengthVal}

          <input
            type="checkbox"
            onChange={(e) => setNumberAllowed((prev) => !prev)}
          />
          <label> Number </label>

          <input
            type="checkbox"
            onChange={(e) => setSpclCharAllowed((prev) => !prev)}
          />
          <label> Special Character </label>
        </div>
      </div>
    </>
  );
}

export default App;
