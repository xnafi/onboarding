import { useState, useEffect } from "react";
import OnboardingModal from "./OnboardingModal/OnboardingModal";
import Navbar from "../../shared/Navbar";
import Button from "../../re-ui/Button";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import OnBoardingVideo from "./OnBoardingComponents/OnBoardingVideo";
import SetupAccount from "./OnBoardingComponents/SetupAccount";
import DescribeBusiness from "./OnBoardingComponents/DescribeBusiness";
import OnboardingRole from "./OnBoardingComponents/OnboardingRole";
import OnboardingProjectDetails from "./OnBoardingComponents/OnboardingProjectDetails";
import OnboardingProjectOverview from "./OnBoardingComponents/OnboardingProjectOverview";
import AiEmployees from "./OnBoardingComponents/AiEmployees";

export default function Onboarding() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    website: "",
    role: "",
    projectDetails: "",
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev

  useEffect(() => {
    const savedData = localStorage.getItem("onboardingData");
    if (savedData) {
      setForm(JSON.parse(savedData));
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    setDirection(1);
    if (currentStep < stepContent.length - 1)
      setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setDirection(-1);
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const handleContinue = (modalData) => {
    setForm((prev) => ({ ...prev, ...modalData }));
    setIsOpen(false);
    localStorage.setItem(
      "onboardingData",
      JSON.stringify({ ...form, ...modalData })
    );
  };

  const stepContent = [
    // starting video component
    <OnBoardingVideo handleNext={handleNext} />,
    // setup account
    <SetupAccount handleNext={handleNext} />,
    // describe business step
    <DescribeBusiness
      form={form}
      handleChange={handleChange}
      handlePrev={handlePrev}
      handleNext={handleNext}
    />,

    // role step
    <OnboardingRole
      form={form}
      handleChange={handleChange}
      handlePrev={handlePrev}
      handleNext={handleNext}
    />,
    // project details step
    <OnboardingProjectDetails
      form={form}
      handleChange={handleChange}
      handlePrev={handlePrev}
      handleNext={handleNext}
    />,
    // ongoing project overview
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
    // Ai employee
    <AiEmployees
      form={form}
      handleChange={handleChange}
      handleNext={handleNext}
    />,
  ];

  // Animation variants
  const variants = {
    enter: (direction) => ({ y: direction > 0 ? 50 : -50, opacity: 0 }),
    center: { y: 0, opacity: 1 },
    exit: (direction) => ({ y: direction > 0 ? -50 : 50, opacity: 0 }),
  };

  return (
    <div className="relative min-h-screen bg-gray-50 flex flex-col overflow-hidden">
      <Navbar />

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <OnboardingModal onContinue={handleContinue} />
        </div>
      )}

      {!isOpen && (
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
    </div>
  );
}
