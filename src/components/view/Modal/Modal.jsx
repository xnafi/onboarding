// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import SignUpPage from "../SignUp/SignUpPage";
import RadioGroupStep from "../ModalComponents/RadioGroupStep";
import Stepper from "../../re-ui/Stepper/Stepper";

export default function Modal({ isOpen, onClose }) {
  const totalSteps = 3;

  const [step, setStep] = useState(() => {
    const savedStep = localStorage.getItem("onboardingStep");
    return savedStep ? Number(savedStep) : 1;
  });
  const [form, setForm] = useState(() => {
    const savedForm = localStorage.getItem("onboardingForm");
    return savedForm
      ? JSON.parse(savedForm)
      : {
          employeeCount: "",
          companyRole: "",
          companyInterest: "",
        };
  });
  console.log(JSON.stringify(form));

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
    localStorage.removeItem("onboardingForm");
  };

  const handleLoginSuccess = () => {
    setShowLogin(false);
    setStep(3);
  };

  if (!isOpen) return null;

  const stepContent = [
    // Employee count step
    <RadioGroupStep
      title="Get started with Quantum OS!"
      subtitle="How many employees does your company have?"
      options={[
        "Just me",
        "Between 2 and 14",
        "Between 15 and 24",
        "Between 25 and 49",
        "Between 50 and 99",
        "Between 100 and 499",
        "500 or greater",
      ]}
      name="employeeCount"
      value={form.employeeCount}
      onChange={handleChange}
      onNext={handleNext}
    />,
    // Company role step
    <RadioGroupStep
      title="Get started with Quantum OS!"
      subtitle="What is your role in the company?"
      options={[
        "Individual Contributor",
        "Manager of Small Team",
        "Manager of Large Team",
        "Director or VP",
        "CEO or Executive",
      ]}
      name="companyRole"
      value={form.companyRole}
      onChange={handleChange}
      onNext={handleNext}
      onPrev={handlePrev}
    />,
    //  company interest step
    <RadioGroupStep
      title="Get started with Quantum OS!"
      subtitle="Why are you interested in Quantum OS? Select all that apply."
      options={[
        "Ai inbound and outbound receptionist, call center, dispatch, support, sales",
        "lead generation with automation and ai qualifying",
        "automate my font and back office workforce",
        "increase my sales while reducing my overhead"
      ]}
      name="companyInterest"
      value={form.companyInterest}
      onChange={handleChange}
      onNext={handleNext}
      onPrev={handlePrev}
    />,
  ];

  return (
    <div className="absolute mt-10 w-full rounded-t-xl shadow-xl/20 sm:rounded-xl lg:mt-0 from-primary-light flex min-h-[85vh] flex-col bg-gradient-to-b from-20% to-white p-0 sm:min-h-0 sm:w-full sm:max-w-2xl md:p-0 backdrop:bg-black/60 backdrop:opacity-0 backdrop:backdrop-blur-xs backdrop:transition backdrop:transition-discrete backdrop:duration-500 open:flex open:translate-y-0 open:opacity-100 open:starting:translate-y-20 open:starting:opacity-0 open:backdrop:opacity-100 open:backdrop:starting:opacity-0">
      <div className="bg-white p-8 rounded shadow-lg min-w-[300px] relative overflow-hidden bg-gradient-to-b from-20% from-[#EEF5FF]">
        <div className="pt-2">
          <AnimatePresence mode="wait">
            {showLogin ? (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <SignUpPage onLogin={handleLoginSuccess} />
              </motion.div>
            ) : (
              <>
                <Stepper
                  step={step}
                  totalSteps={totalSteps}
                  showLogin={showLogin}
                />
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
