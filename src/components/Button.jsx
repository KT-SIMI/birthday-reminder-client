export default function Button({
  type = "button",
  onClick,
  text,
  className = "",
}) {
  return (
    <button type={type} className={`submit-btn ${className}`} onClick={onClick}>
      {text}
    </button>
  );
}
