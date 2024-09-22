function OperButton({ operand, dispatch }) {
  return (
    <button
      onClick={() => {
        dispatch({ type: "select-oper", payload: { operand } });
      }}
    >
      {operand}
    </button>
  );
}

export default OperButton;
