import React from "react";

export default function Stepper({ step, totalSteps, showLogin }) {
  return (
    <div className="flex items-center justify-center w-full py-4 bg-gray-100 rounded-t">
      {Array.from({ length: totalSteps }).map((_, idx) => {
        const isDone = step > idx + 1 && !showLogin;
        const isActive = step === idx + 1 && !showLogin;
        return (
          <React.Fragment key={idx}>
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center
                ${isActive ? "bg-blue-500" : "bg-gray-300"}
                ${isDone ? "!bg-blue-600 border-2 border-blue-500" : ""}
                transition-all duration-200`}
            >
              {isDone ? (
                <span className="text-white text-xs font-bold">&#10003;</span> // tick mark
              ) : (
                ""
              )}
            </div>
            {idx < totalSteps - 1 && (
              <div
                className={`h-1 w-8 ${
                  isDone || isActive ? "bg-blue-500" : "bg-gray-300"
                } transition-all duration-200`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
