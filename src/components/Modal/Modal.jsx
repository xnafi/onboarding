import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import LoginPage from "./LoginPage";

export default function Modal({ isOpen, onClose }) {
  const totalSteps = 5;

  const [step, setStep] = useState(() => {
    const savedStep = localStorage.getItem("onboardingStep");
    return savedStep ? Number(savedStep) : 1;
  });
  const [form, setForm] = useState(() => {
    const savedForm = localStorage.getItem("onboardingForm");
    return savedForm
      ? JSON.parse(savedForm)
      : {
          firstName: "",
          lastName: "",
          password: "",
          gender: "",
          source: "",
        };
  });

  // Add login state to show login after step 3
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    localStorage.setItem("onboardingForm", JSON.stringify(form));
  }, [form]);

  useEffect(() => {
    localStorage.setItem("onboardingStep", step);
  }, [step]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Show login after step 3
  const handleNext = () => {
    if (step === 3) {
      setShowLogin(true);
    } else {
      setStep(step + 1);
    }
  };
  const handlePrev = () => setStep(step - 1);

  const handleClose = () => {
    setStep(1);
    setShowLogin(false);
    onClose();
    // localStorage.removeItem("onboardingForm");
    // localStorage.removeItem("onboardingStep");
  };

  // After successful login, go to step 4
  const handleLoginSuccess = () => {
    setShowLogin(false);
    setStep(4);
  };

  if (!isOpen) return null;

  // Stepper component
  const Stepper = () => (
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

  const stepContent = [
    <>
      <h2 className="text-xl font-bold mb-4">Step 1: First Name</h2>
      <input
        type="text"
        name="firstName"
        value={form.firstName}
        onChange={handleChange}
        placeholder="Enter first name"
        className="border p-2 w-full mb-4"
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleNext}
        disabled={!form.firstName}
      >
        Next
      </button>
    </>,
    <>
      <h2 className="text-xl font-bold mb-4">Step 2: Last Name</h2>
      <input
        type="text"
        name="lastName"
        value={form.lastName}
        onChange={handleChange}
        placeholder="Enter last name"
        className="border p-2 w-full mb-4"
      />
      <div className="flex justify-between">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={handlePrev}
        >
          Back
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleNext}
          disabled={!form.lastName}
        >
          Next
        </button>
      </div>
    </>,
    <>
      <h2 className="text-xl font-bold mb-4">Step 3: Password</h2>
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Enter password"
        className="border p-2 w-full mb-4"
      />
      <div className="flex justify-between">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={handlePrev}
        >
          Back
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleNext}
          disabled={!form.password}
        >
          Next
        </button>
      </div>
    </>,
    <>
      <h2 className="text-xl font-bold mb-4">Step 4: Gender</h2>
      <select
        name="gender"
        value={form.gender}
        onChange={handleChange}
        className="border p-2 w-full mb-4"
      >
        <option value="">Select gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <div className="flex justify-between">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={handlePrev}
        >
          Back
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleNext}
          disabled={!form.gender}
        >
          Next
        </button>
      </div>
    </>,
    <>
      <h2 className="text-xl font-bold mb-4">
        Step 5: What’s the source of this earning?
      </h2>
      <div className="mb-4">
        <label className="mr-4">
          <input
            type="radio"
            name="source"
            value="job"
            checked={form.source === "job"}
            onChange={handleChange}
            className="mr-1"
          />
          Job
        </label>
        <label className="mr-4">
          <input
            type="radio"
            name="source"
            value="business"
            checked={form.source === "business"}
            onChange={handleChange}
            className="mr-1"
          />
          Business
        </label>
        <label className="mr-4">
          <input
            type="radio"
            name="source"
            value="investment"
            checked={form.source === "investment"}
            onChange={handleChange}
            className="mr-1"
          />
          Investment
        </label>
        <label>
          <input
            type="radio"
            name="source"
            value="other"
            checked={form.source === "other"}
            onChange={handleChange}
            className="mr-1"
          />
          Other
        </label>
      </div>
      <div className="flex justify-between">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={handlePrev}
        >
          Back
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleClose}
          disabled={!form.source}
        >
          Finish
        </button>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <strong>Collected Data:</strong>
        <pre>{JSON.stringify(form, null, 2)}</pre>
      </div>
    </>,
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded shadow-lg min-w-[300px] relative overflow-hidden">
        {/* Stepper bar */}

        <div className="pt-2">
          <AnimatePresence mode="wait">
            {showLogin ? (
              <LoginPage onLogin={handleLoginSuccess} />
            ) : (
              <>
                <Stepper />
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  {stepContent[step - 1]}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded mt-1 absolute top-0 right-1"
          onClick={handleClose}
        >
          x
        </button>
      </div>
    </div>
  );
}
