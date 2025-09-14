export default function Button({
  children,
  onClick,
  disabled,
  className = "",
}) {
  return (
    <button
      className={`bg-blue-500 text-white px-4 py-2 rounded ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
