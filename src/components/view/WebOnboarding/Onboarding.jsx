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
            name: "AI Workforce Setup",
            color: "#4CAF50",
            tasks: [
              {
                task: "Automate front office tasks (calls, emails, chat)",
                role: "AI Receptionist",
              },
              {
                task: "Handle social media posting and engagement",
                role: "AI Social Media Manager",
              },
              {
                task: "Capture and qualify leads from your website",
                role: "AI Sales Assistant",
              },
            ],
          },
          {
            name: "Business Workflow Automation",
            color: "#FF9800",
            tasks: [
              {
                task: "Analyze business processes and bottlenecks",
                role: "Automation Strategist",
              },
              {
                task: "Design workflow automation blueprint",
                role: "Workflow Designer",
              },
              {
                task: "Implement no-code integrations (Zapier/Make)",
                role: "Automation Engineer",
              },
            ],
          },
          {
            name: "Sales & Marketing Automation",
            color: "#2196F3",
            tasks: [
              {
                task: "Create content calendars and schedule posts",
                role: "Marketing AI",
              },
              {
                task: "Send follow-up emails based on lead behavior",
                role: "Sales Outreach AI",
              },
              {
                task: "Segment audiences for campaigns",
                role: "CRM Specialist AI",
              },
            ],
          },
          {
            name: "Customer Support Automation",
            color: "#E91E63",
            tasks: [
              {
                task: "Handle FAQs and support tickets",
                role: "AI Support Agent",
              },
              {
                task: "Escalate complex issues to human agents",
                role: "Support Coordinator AI",
              },
              {
                task: "Provide 24/7 chat and email responses",
                role: "AI Virtual Agent",
              },
            ],
          },
          {
            name: "Back Office Operations Automation",
            color: "#9C27B0",
            tasks: [
              {
                task: "Automate scheduling and calendar management",
                role: "Scheduling Assistant AI",
              },
              {
                task: "Handle data entry and form processing",
                role: "Data Entry AI",
              },
              {
                task: "Prepare recurring reports",
                role: "Reporting Analyst AI",
              },
            ],
          },
          {
            name: "Enterprise Solutions",
            color: "#3F51B5",
            tasks: [
              {
                task: "Automate inventory and supply chain workflows",
                role: "Operations AI",
              },
              {
                task: "Optimize quality control and compliance",
                role: "QA Automation AI",
              },
              {
                task: "Digitize financial reporting and approvals",
                role: "Finance Automation AI",
              },
            ],
          },
          {
            name: "Pocket Boss (Personal AI Assistant)",
            color: "#CDDC39",
            tasks: [
              {
                task: "Manage schedules and appointments",
                role: "AI Executive Assistant",
              },
              {
                task: "Send reminders and follow-ups",
                role: "AI Communications Assistant",
              },
              {
                task: "Coordinate small team workflows",
                role: "AI Project Coordinator",
              },
            ],
          },
          {
            name: "Data & Analytics Automation",
            color: "#FF5722",
            tasks: [
              {
                task: "Track KPIs across business systems",
                role: "Analytics AI",
              },
              { task: "Build automated dashboards", role: "Data Analyst AI" },
              {
                task: "Generate weekly/monthly performance reports",
                role: "Reporting AI",
              },
            ],
          },
          {
            name: "Ongoing Optimization & Support",
            color: "#009688",
            tasks: [
              {
                task: "Monitor performance and ROI metrics",
                role: "AI Performance Analyst",
              },
              {
                task: "Refine workflows based on feedback",
                role: "AI Process Manager",
              },
              {
                task: "Provide ongoing updates and support",
                role: "AI Support Specialist",
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
