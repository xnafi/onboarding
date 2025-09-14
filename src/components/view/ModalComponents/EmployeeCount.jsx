import React from "react";
import Button from "../../re-ui/Button";

const options = [
  "Just me",
  "Between 2 and 14",
  "Between 15 and 24",
  "Between 25 and 49",
  "Between 50 and 99",
  "Between 100 and 499",
  "500 or greater",
];

export default function EmployeeCount({ value, onChange, onNext }) {
  return (
    <>
      <h2 className="font-display text-[#5072DF] mb-4 text-3xl/tight font-semibold tracking-tight text-balance sm:text-[32px]">
        Get started with Quantum OS!
      </h2>
      <h3 className="mb-4 text-lg font-semibold">
        How many employees does your company have?
      </h3>
      <div className="flex mb-4 flex-col space-y-2">
        {/* options are mapped here */}
        {options.map((opt) => (
          <label
            key={opt}
            className="mr-4 has-checked:ring-[#5072DF] hover:ring-[#dbdbdb] hover:has-checked:ring-primary to-primary-light from-white has-checked:bg-gradient-to-b flex cursor-pointer flex-row items-center gap-2 rounded-md bg-white px-3 py-2 ring-1 ring-[#f1f1f1] has-checked:ring-2"
          >
            <input
              type="radio"
              name="employeeCount"
              value={opt}
              checked={value === opt}
              onChange={onChange}
              className="mr-1"
            />
            {opt}
          </label>
        ))}
      </div>
      {/* button for next */}
      <Button onClick={onNext} disabled={!value}>
        Next
      </Button>
    </>
  );
}
