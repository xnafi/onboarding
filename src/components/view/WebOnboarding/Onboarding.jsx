import { useState, useEffect, useMemo, useCallback } from "react";
import Navbar from "../../shared/Navbar";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router";
import Celebration from "../../hooks/Celebration";
import OnboardingModal from "./OnboardingModal/OnboardingModal";
import OnBoardingVideo from "./OnBoardingComponents/OnBoardingVideo";
import SetupAccount from "./OnBoardingComponents/SetupAccount";
import DescribeBusiness from "./OnBoardingComponents/DescribeBusiness";
import OnboardingRole from "./OnBoardingComponents/OnboardingRole";
import OnboardingProjectDetails from "./OnBoardingComponents/OnboardingProjectDetails";
import OnboardingProjectOverview from "./OnBoardingComponents/OnboardingProjectOverview";
import AiEmployees from "./OnBoardingComponents/AiEmployees";

export default function Onboarding() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    website: "",
    role: "",
    projectDetails: "",
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
    if (currentStep < 6) {
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
        projectDescription="In QuantumOS, projects are divided into Stages based on the type of services you choose. Each stage has tasks handled by specialized AI roles."
        companyName="Acme Business"
        stages={[
          {
            name: "🎯 Lead Capture & Sales Growth",
            color: "#4CAF50",
            tasks: [
              {
                task: " Smart Lead Management - Auto-capture, score & route leads from all sources",
                role: "Ai Contact Manager",
              },
              {
                task: "Sales Pipeline Automation - Automate deal progression, approvals & follow-ups",
                role: "Ai Marketing Planner",
              },
              {
                task: "Lead Scoring & Handoffs - Predictive scoring with automated sales notifications ",
                role: "Ai Lead Insights Specialist",
              },
            ],
          },
          {
            name: "📱 Marketing & Social MediaMarketing & Social Media",
            color: "#FF9800",
            tasks: [
              {
                task: "Social Media Management - Schedule posts, automate engagement & track ROI",
                role: "Ai Social Media Manager",
              },
              {
                task: "Audience Segmentation - Dynamic lists based on behavior & demographics",
                role: "Ai Lead Gen Specialist",
              },
              {
                task: "Content Calendar Automation - Automated publishing with performance tracking",
                role: "Ai Social Media Manager",
              },
              {
                task: "Contact and Lead Campaign Development - Multi-touch point tracking with ROI analysis",
                role: "Ai PPC Analyst",
              },
            ],
          },
          {
            name: "💬 Customer Support Excellence",
            color: "#2196F3",
            tasks: [
              {
                task: " AI Chatbot & Self-Service - 24/7 handling Inbound and outbound calls and messages",
                role: "Ai Receptionist",
              },
              {
                task: "Smart Ticket Routing - Auto-categorize by urgency, customer tier & issue type",
                role: "Ai Customer Support",
              },
              {
                task: "Omni-Channel Management - Unified conversations across all communication channels",
                role: "Ai CRM Manage",
              },
            ],
          },
          {
            name: "🏢 Back Office Operations",
            color: "#E91E63",
            tasks: [
              {
                task: "Document Processing - OCR data extraction with automated approval workflows",
                role: "Ai Doc Controller",
              },
              {
                task: "Financial Automation - Invoice generation, payment processing & reporting",
                role: "Ai Bookkeeper",
              },
              {
                task: "HR & Employee Management - Onboarding, scheduling & performance tracking",
                role: "Ai Human Resource Manager",
              },
            ],
          },
          {
            name: "🤖 Personal AI Assistant / with (Pocket Boss) with Alli your AI Co-CEO",
            color: "#9C27B0",
            tasks: [
              {
                task: "All Workflows Pre-built - Full Business Automation",
                role: "",
              },
              {
                task: "Smart Calendar Management - Multi-calendar coordination with conflict resolution",
                role: "",
              },
              {
                task: "Automated Reminders - Task deadlines, client check-ins & payment notifications",
                role: "",
              },
              {
                task: "Executive Dashboard - Unified interface with mobile accessibility",
                role: "",
              },
            ],
          },
          {
            name: "📊 Data & Analytics Intelligence",
            color: "#3F51B5",
            tasks: [
              {
                task: " Real-Time KPI Tracking - Multi-system integration with automated alerts",
                role: "",
              },
              {
                task: "Automated Reporting - Scheduled reports with predictive insights",
                role: "",
              },
              {
                task: "Advanced Analytics - Predictive modeling, anomaly detection & ROI calculations",
                role: "",
              },
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
    ],
    [form, handleChange, handlePrev, handleNext]
  );

  const variants = {
    enter: (d) => ({ y: d > 0 ? 40 : -40, opacity: 0 }),
    center: { y: 0, opacity: 1 },
    exit: (d) => ({ y: d > 0 ? -40 : 40, opacity: 0 }),
  };

  return (
    <div className="relative min-h-screen bg-gray-50 flex flex-col overflow-hidden">
      <Navbar />

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
