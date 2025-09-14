import React from "react";
import Button from "../../re-ui/Button";

const options = [
  // options for Company Interest
  " Manage my personal tasks",
  "Manage my team or company’s work",
  "Set up AI Employees to do work for me or my team",
];

export default function CompanyInterest({ value, onChange, onNext, onPrev }) {

  return (
    <>
      <h2 className="font-display text-[#5072DF] mb-4 text-3xl/tight font-semibold tracking-tight text-balance sm:text-[32px]">
        Get started with Quantum OS!
      </h2>
      <h3 className="mb-4 text-lg font-semibold">
        Why are you interested in Quantum OS? Select all that apply.?
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
              name="companyInterest"
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
      <div className="flex justify-between">
        <Button variant="secondary" onClick={onPrev}>
          Back
        </Button>
        <Button onClick={onNext} variant="primary" disabled={!value}>
          Next
        </Button>
      </div>
    </>
  );
}
