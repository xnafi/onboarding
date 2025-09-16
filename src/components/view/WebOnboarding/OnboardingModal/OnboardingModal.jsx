import { useState } from "react";
import Button from "../../../re-ui/Button";

export default function OnboardingModal({ onContinue }) {
  const options = [
    "LinkedIn",
    "Twitter",
    "Facebook",
    "Instagram",
    "TikTok",
    "Google",
    "Others",
  ];

  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");

  const handleContinue = () => {
    if (!selected) {
      setError("⚠️ Please select one option before continuing");
      return;
    }
    setError("");
    onContinue({ hearFrom: selected });
  };

  return (
    <div className="mt-10 w-full rounded-t-xl shadow-xl/20 sm:rounded-xl lg:mt-0 from-primary-light flex flex-col bg-gradient-to-b from-20% to-white p-0 sm:min-h-0 sm:w-full sm:max-w-lg md:p-0">
      <div className="bg-blue-500 h-20 rounded-t-md flex flex-col justify-center items-center">
        <h2 className="font-display text-white mb-2 text-xl font-semibold px-2 text-center">
          Thanks For Choosing Quantum OS For Teams!
        </h2>
      </div>
      <div className="bg-white pb-8 px-3 md:px-8 pt-4 rounded shadow-lg w-full relative overflow-hidden bg-gradient-to-b from-20% from-[#EEF5FF] ">
        <h3 className="mb-4 text-lg font-semibold">
         How did you hear about us?
        </h3>
        {/* Error shows here */}
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <div className="flex mb-4 flex-col space-y-2">
          {options.map((opt) => (
            <label
              key={opt}
              className={`flex items-center gap-2 cursor-pointer rounded-md px-3 py-2 ring-1 ${
                selected === opt
                  ? "bg-gradient-to-b from-white to-[#EEF5FF] ring-[#5072DF]"
                  : "bg-white ring-[#f1f1f1]"
              }`}
            >
              <input
                type="radio"
                name="companyInterest"
                value={opt}
                checked={selected === opt}
                onChange={() => {
                  setSelected(opt);
                  setError("");
                }}
              />
              {opt}
            </label>
          ))}
        </div>

        <div className="flex justify-center">
          <Button variant="primary" onClick={handleContinue}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
