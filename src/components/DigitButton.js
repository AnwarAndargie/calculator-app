function DigitButton({ digit, dispatch }) {
  return (
    <button
      onClick={() => {
        dispatch({ type: "write-digit", payload: { digit } });
      }}
    >
      {digit}
    </button>
  );
}

export default DigitButton;
