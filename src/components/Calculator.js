import { useReducer } from "react";
import "./calc.css";
import DigitButton from "./DigitButton";
import OperButton from "./OperButton";

function Calculator() {
  // console.log(overWrite);
  function reducer(state, { type, payload }) {
    switch (type) {
      case "write-digit":
        if (!state.overWrite) {
          if (payload.digit === "0" && state.currentOper === "0") {
            return {
              ...state,
            };
          }
          if (payload.digit === "." && state.currentOper.includes(".")) {
            return {
              ...state,
            };
          }
          // if (payload.digit.includes()) {
          //   return { ...state };
          // }
          return {
            ...state,
            currentOper: `${state.currentOper || ""}${payload.digit}`,
          };
        }

        return {
          ...state,
          currentOper: payload.digit,
          overWrite: false,
        };
      case "select-oper": {
        if (state.currentOper == null && state.prevOper == null) {
          return state;
        }
        if (state.currentOper == null) {
          return {
            ...state,
            operation: payload.operand,
          };
        }
        if (state.prevOper == null)
          return {
            ...state,
            operation: payload.operand,
            prevOper: state.currentOper,
            currentOper: null,
          };
        return {
          ...state,
          prevOper: evaluate(state),
          operation: payload.operand,
          currentOper: null,
        };
      }
      case "clear-all": {
        return {};
      }
      case "delete-one": {
        if (state.overWrite) {
          return {
            ...state,
            overWrite: false,
            currentOper: null,
          };
        }
        if (state.currentOper == null) return state;

        if (state.currentOper.length === 1) {
          return {
            ...state,
            currentOper: null,
          };
        }

        return {
          ...state,
          currentOper: state.currentOper.slice(0, -1),
        };
      }
      case "equal-sign": {
        console.log(state, state.overWrite);
        if (state.prevOper == null) {
          return {
            ...state,
            currentOper: state.currentOper,
          };
        }
        return {
          ...state,
          prevOper: null,
          currentOper: evaluate(state),
          operation: null,
          overWrite: true,
        };
      }
    }
  }
  const [{ currentOper, prevOper, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  function evaluate({ currentOper, prevOper, operation }) {
    const prev = parseFloat(prevOper);
    const curr = parseFloat(currentOper);
    if (isNaN(prev) || isNaN(curr)) return "";

    let comp = "";
    switch (operation) {
      case "+":
        comp = prev + curr;
        break;
      case "-":
        comp = prev - curr;
        break;
      case "*":
        comp = prev * curr;
        break;
      case "÷":
        comp = prev / curr;
        break;
    }

    return comp.toString();
  }
  const INT_FORMAT = new Intl.NumberFormat("en-us", {
    maximumFractionDigits: 0,
  });
  function formatOper(oper) {
    if (oper == null) return;
    const [integer, decimal] = oper.split(".");
    if (decimal == null) return INT_FORMAT.format(oper);
    return `${INT_FORMAT.format(oper)}.${decimal}`;
  }
  return (
    <div className="calculator-grid">
      <div className="ans-display">
        <div className="prev-oper">
          {formatOper(prevOper)} {operation}
        </div>
        <div className="current-oper">{formatOper(currentOper)}</div>
      </div>

      <button
        className="span-two"
        onClick={() => {
          dispatch({ type: "clear-all" });
        }}
      >
        AC
      </button>
      <button
        onClick={() => {
          dispatch({ type: "delete-one" });
        }}
      >
        DEL
      </button>

      <OperButton operand={"÷"} dispatch={dispatch} />
      <DigitButton digit={1} dispatch={dispatch} />

      <DigitButton digit={2} dispatch={dispatch} />
      <DigitButton digit={3} dispatch={dispatch} />
      <OperButton operand={"*"} dispatch={dispatch} />
      <DigitButton digit={4} dispatch={dispatch} />
      <DigitButton digit={5} dispatch={dispatch} />
      <DigitButton digit={6} dispatch={dispatch} />
      <OperButton operand={"+"} dispatch={dispatch} />
      <DigitButton digit={7} dispatch={dispatch} />
      <DigitButton digit={8} dispatch={dispatch} />
      <DigitButton digit={9} dispatch={dispatch} />
      <OperButton operand={"-"} dispatch={dispatch} />
      <DigitButton digit={"."} dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button
        className="span-two"
        onClick={() => {
          dispatch({ type: "equal-sign" });
        }}
      >
        =
      </button>
    </div>
  );
}

export default Calculator;
