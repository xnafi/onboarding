import Button from "./Button";

export default function RadioGroupStep({
  title,
  subtitle,
  options,
  name,
  value,
  onChange,
  onNext,
  onPrev,
  type = "radio",
  showPrev = true,
  nextLabel = "Next",
  prevLabel = "Back",
}) {
  return (
    <>
      <h2 className="font-display text-[#5072DF] mb-4 text-3xl/tight font-semibold tracking-tight text-balance sm:text-[32px] mt-5">
        {title}
      </h2>
      <h3 className="mb-4 text-lg font-semibold">{subtitle}</h3>

      <div className="flex mb-4 flex-col space-y-2 capitalize">
        {options.map((opt) => {
          const isSelected =
            type === "radio" ? value === opt : value.includes(opt);

          return (
            <label
              key={opt}
              className="flex items-center gap-3 cursor-pointer px-3 py-2 rounded-md transition-all"
            >
              {/* Hidden input for accessibility */}
              <input
                type={type === "radio" ? "radio" : "checkbox"}
                name={name}
                value={opt}
                checked={isSelected}
                onChange={onChange}
                className="sr-only"
                aria-checked={isSelected}
              />
              {/* Custom circle for radio-style */}
              <span
                className={`w-5 h-5 flex-shrink-0 rounded-full border-2 flex items-center justify-center transition-all
                  ${
                    isSelected
                      ? "bg-[#5072DF]  border-[#5072DF]"
                      : "bg-white border-black/30 hover:border-[#5072DF]"
                  }`}
              >
              
              </span>
              <span className="flex-1 text-black">{opt}</span>
            </label>
          );
        })}
      </div>

      <div className="flex justify-between">
        {showPrev && (
          <Button variant="secondary" onClick={onPrev}>
            {prevLabel}
          </Button>
        )}
        <Button
          onClick={onNext}
          variant="primary"
          disabled={type === "radio" ? !value : value.length === 0}
        >
          {nextLabel}
        </Button>
      </div>
    </>
  );
}
