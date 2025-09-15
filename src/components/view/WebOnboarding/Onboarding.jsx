import React, { useState, useEffect } from "react";
import OnboardingModal from "./OnboardingModal/OnboardingModal";

export default function Onboarding() {
  const [isOpen, setIsOpen] = useState(true);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem("onboardingData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
      setIsOpen(false); 
    }
  }, []);

  const handleContinue = (data) => {
    setFormData(data);
    setIsOpen(false);
    // save to localStorage
    localStorage.setItem("onboardingData", JSON.stringify(data));
    console.log("Collected data:", data);
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      {isOpen && <OnboardingModal onContinue={handleContinue} />}
      {!isOpen && formData && (
        <div className="text-center">
          <h2 className="text-xl font-bold">Thanks for your input 🎉</h2>
          <p>
            You selected:{" "}
            <span className="font-semibold">{formData.hearFrom}</span>
          </p>
        </div>
      )}
    </div>
  );
}
