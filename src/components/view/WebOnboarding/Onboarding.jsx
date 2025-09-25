import { useState, useEffect, useMemo, useCallback } from "react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router";
import Celebration from "../../hooks/Celebration";
import OnboardingModal from "./OnboardingModal/OnboardingModal";
import OnBoardingVideo from "./OnBoardingComponents/OnBoardingVideo";
import DescribeBusiness from "./OnBoardingComponents/DescribeBusiness";
import OnboardingRole from "./OnBoardingComponents/OnboardingRole";
import OnboardingProjectDetails from "./OnBoardingComponents/OnboardingProjectDetails";
import OnboardingProjectOverview from "./OnBoardingComponents/OnboardingProjectOverview";
import AiEmployees from "./OnBoardingComponents/AiEmployees";
import ProjectStages from "../../../config/projectStages";

export default function Onboarding() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    business_web: "",
    business_name: "",
    about_cmpy: "",
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [celebrate, setCelebrate] = useState(false);

  // Load onboarding data once
  useEffect(() => {
    const savedData = localStorage.getItem("onboardingData");
    if (savedData) {
      setForm(JSON.parse(savedData));
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, []);

  // Celebration redirect effect
  useEffect(() => {
    if (celebrate) {
      const timer = setTimeout(() => {
        setCelebrate(false);
        navigate("/dashboard");
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [celebrate, navigate]);

  // Handlers
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleNext = useCallback(() => {
    setDirection(1);
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setCelebrate(true);
      localStorage.setItem("onboardingData", JSON.stringify(form));
    }
  }, [currentStep, form]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  }, [currentStep]);

  const handleContinue = useCallback(
    (modalData) => {
      const updated = { ...form, ...modalData };
      setForm(updated);
      setIsOpen(false);
      localStorage.setItem("onboardingData", JSON.stringify(updated));
    },
    [form]
  );

  // Step content memoized
  const stepContent = useMemo(
    () => [
      <OnBoardingVideo handleNext={handleNext} />,
      <DescribeBusiness
        form={form}
        handleChange={handleChange}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />,
      <OnboardingProjectDetails
        form={form}
        handleChange={handleChange}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />,
      <OnboardingProjectOverview
        projectTitle="Here’s your project!"
        projectDescription="In QuantumOS, projects are divided into Stages based on the type of services you choose. Each stage has tasks handled by specialized AI roles."
        companyName="Acme Business"
        stages={ProjectStages}
        form={form}
        handleChange={handleChange}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />,
      <AiEmployees
        form={form}
        handleChange={handleChange}
        handleNext={handleNext}
      />,
    ],
    [form, handleChange, handlePrev, handleNext]
  );

  const variants = {
    enter: (d) => ({ y: d > 0 ? 40 : -40, opacity: 0 }),
    center: { y: 0, opacity: 1 },
    exit: (d) => ({ y: d > 0 ? -40 : 40, opacity: 0 }),
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
        >
          <OnboardingModal onContinue={handleContinue} />
        </div>
      )}

      {/* Steps */}
      {!isOpen && !celebrate && (
        <div className="flex-1 flex justify-center items-center px-2">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentStep}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="text-center w-full"
            >
              {stepContent[currentStep]}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Celebration */}
      {celebrate && <Celebration />}
    </div>
  );
}
