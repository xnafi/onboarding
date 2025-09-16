import React from "react";
import Button from "../../re-ui/Button";

export default function RadioGroupStep({
  title,
  subtitle,
  options,
  name,
  value,
  onChange,
  onNext,
  onPrev,
  showPrev = true,
  nextLabel = "Next",
  prevLabel = "Back",
}) {
  return (
    <>
      <h2 className="font-display text-[#5072DF] mb-4 text-3xl/tight font-semibold tracking-tight text-balance sm:text-[32px]">
        {title}
      </h2>
      <h3 className="mb-4 text-lg font-semibold">{subtitle}</h3>
      <div className="flex mb-4 flex-col space-y-2 capitalize">
        {options.map((opt) => (
          <label
            key={opt}
            className="mr-4 has-checked:ring-[#5072DF] hover:ring-[#dbdbdb] hover:has-checked:ring-primary to-primary-light from-white has-checked:bg-gradient-to-b flex cursor-pointer flex-row items-center gap-2 rounded-md bg-white px-3 py-2 ring-1 ring-[#f1f1f1] has-checked:ring-2"
          >
            <input
              type="radio"
              name={name}
              value={opt}
              checked={value === opt}
              onChange={onChange}
              className="mr-1"
            />
            {opt}
          </label>
        ))}
      </div>
      <div className="flex justify-between">
        {showPrev && (
          <Button variant="secondary" onClick={onPrev}>
            {prevLabel}
          </Button>
        )}
        <Button onClick={onNext} variant="primary" disabled={!value}>
          {nextLabel}
        </Button>
      </div>
    </>
  );
}
