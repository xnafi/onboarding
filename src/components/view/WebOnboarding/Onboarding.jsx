import { useState, useEffect } from "react";
import OnboardingModal from "./OnboardingModal/OnboardingModal";
import Navbar from "../../shared/Navbar";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";

import OnBoardingVideo from "./OnBoardingComponents/OnBoardingVideo";
import SetupAccount from "./OnBoardingComponents/SetupAccount";
import DescribeBusiness from "./OnBoardingComponents/DescribeBusiness";
import OnboardingRole from "./OnBoardingComponents/OnboardingRole";
import OnboardingProjectDetails from "./OnBoardingComponents/OnboardingProjectDetails";
import OnboardingProjectOverview from "./OnBoardingComponents/OnboardingProjectOverview";
import AiEmployees from "./OnBoardingComponents/AiEmployees";
import { useNavigate } from "react-router"; 
import Celebration from "../../hooks/Celebration";

export default function Onboarding() {
  // Navigation function
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  // Stores form data
  const [form, setForm] = useState({
    website: "",
    role: "",
    projectDetails: "",
  });
  // Tracks current onboarding step
  const [currentStep, setCurrentStep] = useState(0);
  // Animation direction for Framer Motion
  const [direction, setDirection] = useState(1);
  // Controls celebration overlay
  const [celebrate, setCelebrate] = useState(false);

  // Load saved onboarding data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("onboardingData");
    if (savedData) {
      setForm(JSON.parse(savedData));
      // Skip modal if data exists
      setIsOpen(false);
    } else {
      // Show modal if no saved data
      setIsOpen(true);
    }
  }, []);

  // Auto-close celebration and redirect to dashboard/homepage
  useEffect(() => {
    if (celebrate) {
      const timer = setTimeout(() => {
        setCelebrate(false);
        navigate("/dashboard");
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [celebrate, navigate]);

  // Update form state when an input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Go to the next step or trigger celebration on the last step
  const handleNext = () => {
    // Animation direction for forward movement
    setDirection(1);
    if (currentStep < stepContent.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setCelebrate(true); // Trigger celebration overlay
      localStorage.setItem("onboardingData", JSON.stringify(form)); // Save form
    }
  };

  // Go back to the previous step
  const handlePrev = () => {
    // Animation direction for backward movement
    setDirection(-1);
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  // Continue from modal and save modal data to form
  const handleContinue = (modalData) => {
    setForm((prev) => ({ ...prev, ...modalData }));
    // Close modal
    setIsOpen(false);
    localStorage.setItem(
      "onboardingData",
      JSON.stringify({ ...form, ...modalData })
    );
  };

  // Array of components for each onboarding step
  const stepContent = [
    <OnBoardingVideo handleNext={handleNext} />,
    <SetupAccount handleNext={handleNext} />,
    <DescribeBusiness
      form={form}
      handleChange={handleChange}
      handlePrev={handlePrev}
      handleNext={handleNext}
    />,
    <OnboardingRole
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
      projectDescription="In Quantum Ai, projects are divided into Stages..."
      companyName="Acme Plumber"
      stages={[
        {
          name: "Design and Prototype Development",
          color: "#4CAF50",
          tasks: [
            { task: "Conduct market research", role: "Product Designer" },
            {
              task: "Create initial product designs",
              role: "Product Designer",
            },
            { task: "Develop prototypes", role: "Manufacturing Manager" },
          ],
        },
        {
          name: "Testing and Quality Assurance",
          color: "#E91E63",
          tasks: [
            { task: "Perform functionality tests", role: "QA Specialist" },
            { task: "Conduct safety assessments", role: "QA Specialist" },
          ],
        },
        {
          name: "Manufacturing and Distribution",
          color: "#3F51B5",
          tasks: [
            { task: "Prepare manufacturing plans", role: "Manager" },
            { task: "Coordinate with suppliers", role: "Manager" },
          ],
        },
      ]}
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
  ];

  // Framer Motion animation variants
  const variants = {
    enter: (direction) => ({ y: direction > 0 ? 50 : -50, opacity: 0 }),
    center: { y: 0, opacity: 1 },
    exit: (direction) => ({ y: direction > 0 ? -50 : 50, opacity: 0 }),
  };

  return (
    <div className="relative min-h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Onboarding modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <OnboardingModal onContinue={handleContinue} />
        </div>
      )}

      {/* Step content with animation */}
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
              transition={{ duration: 0.4 }}
              className="text-center w-full"
            >
              {stepContent[currentStep]}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Celebration overlay */}
      {celebrate && <Celebration />}
    </div>
  );
}
