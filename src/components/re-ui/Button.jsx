export default function Button({
  children,
  onClick,
  disabled,
  className = "",
  variant = "primary", // default variant
}) {
  let variantClass = "";
  switch (variant) {
    case "primary":
      variantClass = "bg-[#2196F3] text-white shadow-lg";
      break;
    case "secondary":
      variantClass = "bg-[#EEF5FF] text-[#2196F3] shadow-lg";
      break;
    case "danger":
      variantClass = "bg-red-500 text-white";
      break;
    default:
      variantClass = "bg-[#EEF5FF] text-[#5072DF]";
  }

  return (
    <button
      className={`${variantClass} font-medium px-4 py-2 rounded ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
