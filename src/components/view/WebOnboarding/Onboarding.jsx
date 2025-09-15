import React, { useState, useEffect } from "react";
import OnboardingModal from "./OnboardingModal/OnboardingModal";
import Navbar from "../../shared/Navbar";

export default function Onboarding() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem("onboardingData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, []);

  const handleContinue = (data) => {
    setFormData(data);
    setIsOpen(false);
    localStorage.setItem("onboardingData", JSON.stringify(data));
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Navbar always on top */}
      <div >
        <Navbar />
      </div>

      {/* Modal overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <OnboardingModal onContinue={handleContinue} />
        </div>
      )}

      {/* Page content */}
      {!isOpen && formData && (
        <div className="pt-20 flex justify-center items-center min-h-screen">
          <div className="text-center bg-white p-8 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-2">
              Thanks for your input 🎉
            </h2>
            <p>
              You selected:{" "}
              <span className="font-semibold">{formData.hearFrom}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
