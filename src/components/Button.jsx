export default function Button({
  type = "button",
  onClick,
  text,
  className = "",
  loading,
}) {
  return (
    <button
      type={type}
      className={`${className}`}
      onClick={onClick}
      disabled={loading}
    >
      {text}
    </button>
  );
}
