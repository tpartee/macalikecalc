import { useSelector } from "react-redux";
import "./App.css"
import Button from "./app/components/button/button"
import store from "./app/store";

// import { Counter } from "./features/counter/Counter"
// import { Quotes } from "./features/quotes/Quotes"
// import logo from "./logo.svg"

// console.log('Initial state: ', store.getState())

// Used to dispatch all of the value changes necessary to handle resetting the state (e.g. the AC <all-clear> button)
function resetState() {
  store.dispatch({ type: 'setDisplayValue', payload: '0' });
  store.dispatch({ type: 'setDecimalMode', payload: false });
  store.dispatch({ type: 'setStoredValue', payload: 0 });
  store.dispatch({ type: 'setCurrentFunction', payload: 'none' });
  store.dispatch({ type: 'setClearRegister', payload: false });
}

// Add a numeric digit to the display string, taking into account any register clears and/or decimal mode
function addDigit(digit: string) {
  if (store.getState().clearRegister) {
    store.dispatch({ type: 'setDisplayValue', payload: digit });
    store.dispatch({ type: 'setClearRegister', payload: false });
    return;
  }
  if (store.getState().decimalMode) {
    digit = '.' + digit;
    store.dispatch({ type: 'setDecimalMode', payload: false });
  }
  let curVal = store.getState().displayValue;
  let newVal = (curVal == '0') ? digit : curVal + digit;
  store.dispatch({ type: 'setDisplayValue', payload: newVal });
}

// Moves the current display value into storage and sets a function along with a clear register state
function addFunction(func: string) {
  let storeVal = Number.parseFloat(store.getState().displayValue);
  store.dispatch({ type: 'setCurrentFunction', payload: func });
  store.dispatch({ type: 'setStoredValue', payload: storeVal });
  store.dispatch({ type: 'setClearRegister', payload: true });
}

const App = () => {

  // Event Handlers for all of the button clicks

  const handle1Click = () => { addDigit('1'); };
  const handle2Click = () => { addDigit('2'); };
  const handle3Click = () => { addDigit('3'); };
  const handle4Click = () => { addDigit('4'); };
  const handle5Click = () => { addDigit('5'); };
  const handle6Click = () => { addDigit('6'); };
  const handle7Click = () => { addDigit('7'); };
  const handle8Click = () => { addDigit('8'); };
  const handle9Click = () => { addDigit('9'); };
  const handle0Click = () => { addDigit('0'); };

  const handleDotClick = () => {
    if (!store.getState().displayValue.includes('.'))
      store.dispatch({ type: 'setDecimalMode', payload: true });
  };

  const handleAcClick = () => { resetState(); };

  const handleAbsClick = () => {
    let curVal = store.getState().displayValue;
    let newVal = (curVal.startsWith('-')) ? curVal.replace('-', '') : '-' + curVal;
    store.dispatch({ type: 'setDisplayValue', payload: newVal });
  };

  const handleModClick = () => {
    // NYI - Not really sure how the modulus button works on Mac, so didn't implement this, sorry!
  };

  const handleDivClick = () => { addFunction('div'); };
  const handleMulClick = () => { addFunction('mul'); };
  const handleMinClick = () => { addFunction('min'); };
  const handlePlsClick = () => { addFunction('pls'); };

  const handleEquClick = () => {   // This is where all the magic happens!
    store.dispatch({ type: 'setClearRegister', payload: true });   // No matter what, we want to turn on clearing the register
    let curFunc = store.getState().currentFunction;
    if ('none' === curFunc) {   // No function chosen
      let storeVal = Number.parseFloat(store.getState().displayValue);
      store.dispatch({ type: 'setStoredValue', payload: storeVal });
    } else if ('div' === curFunc) {   // Division
      let parseVal = Number.parseFloat(store.getState().displayValue);
      let storeVal = store.getState().storedValue;
      if (0 == parseVal) { resetState(); return; }   // Divide by zero is a no-no, so just clear state when it happens!
      let newVal = storeVal / parseVal;
      store.dispatch({ type: 'setStoredValue', payload: newVal });
      store.dispatch({ type: 'setDisplayValue', payload: newVal });
    } else if ('mul' === curFunc) {   // Multiplication
      let parseVal = Number.parseFloat(store.getState().displayValue);
      let storeVal = store.getState().storedValue;
      let newVal = storeVal * parseVal;
      store.dispatch({ type: 'setStoredValue', payload: newVal });
      store.dispatch({ type: 'setDisplayValue', payload: newVal });
    } else if ('min' === curFunc) {   // Subtraction
      let parseVal = Number.parseFloat(store.getState().displayValue);
      let storeVal = store.getState().storedValue;
      let newVal = storeVal - parseVal;
      store.dispatch({ type: 'setStoredValue', payload: newVal });
      store.dispatch({ type: 'setDisplayValue', payload: newVal });
    } else if ('pls' === curFunc) {   // Addition
      let parseVal = Number.parseFloat(store.getState().displayValue);
      let storeVal = store.getState().storedValue;
      let newVal = storeVal + parseVal;
      store.dispatch({ type: 'setStoredValue', payload: newVal });
      store.dispatch({ type: 'setDisplayValue', payload: newVal });
    } else {   // Fallback to same as 'none'
      let storeVal = Number.parseFloat(store.getState().displayValue);
      store.dispatch({ type: 'setStoredValue', payload: storeVal });
      store.dispatch({ type: 'setCurrentFunction', payload: 'none' });
    }
  };

  // Set up the UI to render for the calculator app

  const displayValue = useSelector( (state: { displayValue: string; }) => state.displayValue );

  return (
    <div className="App">
      <div className="calc-container">
        <div className="dot-area">
          <div className="dot-base dot-red"></div>
          <div className="dot-base dot-yellow"></div>
          <div className="dot-base dot-green"></div>
        </div>
        <div className="display-area">{displayValue}</div>
        <Button onClick={handleAcClick} className="button-normal button-ac">AC</Button>
        <Button onClick={handleAbsClick} className="button-normal button-abs">+/-</Button>
        <Button onClick={handleModClick} className="button-normal button-mod">%</Button>
        <Button onClick={handleDivClick} className="button-normal button-div">÷</Button>

        <Button onClick={handle7Click} className="button-normal button-seven">7</Button>
        <Button onClick={handle8Click} className="button-normal button-eight">8</Button>
        <Button onClick={handle9Click} className="button-normal button-nine">9</Button>
        <Button onClick={handleMulClick} className="button-normal button-mul">X</Button>

        <Button onClick={handle4Click} className="button-normal button-four">4</Button>
        <Button onClick={handle5Click} className="button-normal button-five">5</Button>
        <Button onClick={handle6Click} className="button-normal button-six">6</Button>
        <Button onClick={handleMinClick} className="button-normal button-min">-</Button>

        <Button onClick={handle1Click} className="button-normal button-one">1</Button>
        <Button onClick={handle2Click} className="button-normal button-two">2</Button>
        <Button onClick={handle3Click} className="button-normal button-three">3</Button>
        <Button onClick={handlePlsClick} className="button-normal button-pls">+</Button>

        <Button onClick={handle0Click} className="button-wide button-zero">0</Button>
        <Button onClick={handleDotClick} className="button-normal button-dot">.</Button>
        <Button onClick={handleEquClick} className="button-normal button-equ">=</Button>
      </div>
    </div>
  )
}

export default App
