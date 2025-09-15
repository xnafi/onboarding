import React, { useState, useEffect } from "react";
import OnboardingModal from "./OnboardingModal/OnboardingModal";
import Navbar from "../../shared/Navbar";
import RadioGroupStep from "../ModalComponents/RadioGroupStep";
import Button from "../../re-ui/Button";

export default function Onboarding() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    employeeCount: "",
    companyRole: "",
    companyInterest: "",
    password: "",
    gender: "",
    source: "",
  });
  const [currentStep, setCurrentStep] = useState(0);

  // Check localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("onboardingData");
    if (savedData) {
      setForm(JSON.parse(savedData));
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, []);

  // Update form state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (currentStep < stepContent.length - 1)
      setCurrentStep((prev) => prev + 1);
  };

  // Merge modal data into form
  const handleContinue = (modalData) => {
    setForm((prev) => ({ ...prev, ...modalData }));
    setIsOpen(false);
    localStorage.setItem(
      "onboardingData",
      JSON.stringify({ ...form, ...modalData })
    );
  };

  // Steps after modal
  const stepContent = [
    <>
      <h2 className="text-2xl font-bold mb-4">
        Lets setup your Quantum account
      </h2>
      {/* placeholder text */}
      <p>Please provide the necessary information to create your account.</p>

      {/* placeholder image */}
      <div className="flex justify-center my-6">
        <img
          src="https://images.pexels.com/photos/33835408/pexels-photo-33835408.jpeg"
          alt="Placeholder"
          className="w-[400px] h-[300px] object-cover rounded"
        />
      </div>

      <div className="flex justify-center mt-6">
        <Button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </>,
    <div className="flex flex-col items-center  border">
      <h2 className="text-xl font-bold mb-4">Step 3: Password</h2>
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Enter password"
        className="border p-2 w-full mb-4"
      />
      <div className="flex justify-center mt-6">
        <Button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </div>,
  ];

  return (
    <div className="relative min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Modal overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <OnboardingModal onContinue={handleContinue} />
        </div>
      )}

      {/* Multi-step form after modal */}
      {!isOpen && (
        <div className="flex-1 flex justify-center items-center">
          <div className="text-center">
            {stepContent[currentStep]}
          </div>
        </div>
      )}
    </div>
  );
}
