import React from "react";

export default function Stepper({ step, totalSteps, showLogin }) {
  return (
    <div className="flex items-center justify-center w-full py-4 bg-gray-100 rounded-t">
      {Array.from({ length: totalSteps }).map((_, idx) => (
        <React.Fragment key={idx}>
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center
              ${step === idx + 1 && !showLogin ? "bg-blue-500" : "bg-gray-300"}
              ${
                step > idx + 1 && !showLogin
                  ? "border-2 border-blue-500 bg-yellow-600"
                  : ""
              }
              transition-all duration-1000`}
          >
            <span className="text-white text-xs"></span>
          </div>
          {idx < totalSteps - 1 && (
            <div
              className={`h-1 w-8 ${
                step > idx + 1 && !showLogin ? "bg-blue-500" : "bg-gray-300"
              } transition-all duration-200`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
