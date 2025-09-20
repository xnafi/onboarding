// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useMemo, useCallback } from "react";
import Stepper from "../../re-ui/Stepper/Stepper";
import RadioGroupStep from "../../re-ui/RadioGroupStep";
import SignUpPage from "../SignUp/SignUpPage";

const EMPLOYEE_OPTIONS = [
  "Just me",
  "Between 2 and 14",
  "Between 15 and 24",
  "Between 25 and 49",
  "Between 50 and 99",
  "Between 100 and 499",
  "500 or greater",
];

const ROLE_OPTIONS = [
  "CEO Or Executive",
  "Business Owner",
  "Director or VP",
  "Marketing Manager",
  "Sales Manager",
];

const CHALLENGE_OPTIONS = [
  "Faster Response Times - Speed to Lead and with the best of Sales, Support and Billing",
  "24/7 Lead Capture & Engagement - Custom Ai managed lead qualifying",
  "Automated Lead Nurturing - Ai managed and lead management",
  "Better Insights & Tracking - Full AI Real Time Reports",
  "More Time to Run Their Business - Automated Front and back Office",
];

export default function Modal({ isOpen, onClose }) {
  const totalSteps = 4;

  const [step, setStep] = useState(
    () => Number(localStorage.getItem("onboardingStep")) || 1
  );

  const [form, setForm] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("onboardingForm")) || {
        employeeCount: "",
        companyRole: "",
        companyChallenge: [],
        userInfo: [{ firstName: "", lastName: "", phone: "" }],
      }
    );
  });

  // Save form to localStorage with debounce
  useEffect(() => {
    const id = setTimeout(() => {
      localStorage.setItem("onboardingForm", JSON.stringify(form));
    }, 500);
    return () => clearTimeout(id);
  }, [form]);

  useEffect(() => {
    localStorage.setItem("onboardingStep", step);
  }, [step]);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => {
      if (type === "checkbox") {
        const prevArr = prev[name] || [];
        if (checked) {
          return { ...prev, [name]: [...prevArr, value] };
        } else {
          return { ...prev, [name]: prevArr.filter((v) => v !== value) };
        }
      }

      if (["firstName", "lastName", "phone"].includes(name)) {
        return {
          ...prev,
          userInfo: [{ ...prev.userInfo[0], [name]: value }],
        };
      }

      return { ...prev, [name]: value };
    });
  }, []);

  const handleNext = useCallback(() => {
    setStep((prev) => Math.min(prev + 1, totalSteps));
  }, []);

  const handlePrev = useCallback(() => {
    setStep((prev) => Math.max(1, prev - 1));
  }, []);

  const handleClose = useCallback(() => {
    setStep(1);
    setForm({
      employeeCount: "",
      companyRole: "",
      companyChallenge: [],
      userInfo: [{ firstName: "", lastName: "", phone: "" }],
    });
    localStorage.removeItem("onboardingForm");
    localStorage.removeItem("onboardingStep");
    onClose?.();
  }, [onClose]);

  const steps = useMemo(
    () => [
      {
        key: "step1",
        title: "Get started with Quantum OS!",
        subtitle: "What size team are you working with?",
        options: EMPLOYEE_OPTIONS,
        name: "employeeCount",
        value: form.employeeCount,
        type: "radio",
      },
      {
        key: "step2",
        title: "Get started with Quantum OS!",
        subtitle: "What is your role in the company?",
        options: ROLE_OPTIONS,
        name: "companyRole",
        value: form.companyRole,
        type: "radio",
      },
      {
        key: "step3",
        title: "Get started with Quantum OS!",
        subtitle: "What’s your biggest challenge right now",
        options: CHALLENGE_OPTIONS,
        name: "companyChallenge",
        value: form.companyChallenge,
        type: "checkbox",
      },
      {
        key: "step4",
        component: (
          <SignUpPage
            form={{ ...form.userInfo[0], ...form }}
            handleChange={handleChange}
          />
        ),
      },
    ],
    [form, handleChange]
  );

  if (!isOpen) return null;

  const currentStep = steps[step - 1];
  const { key, component, ...stepProps } = currentStep; // Extract key

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-2 sm:px-4"
      onKeyDown={(e) => e.key === "Escape" && handleClose()}
    >
      <div className="bg-white rounded-xl shadow-xl relative w-full max-w-md sm:max-w-lg lg:max-w-2xl p-4 sm:p-6 lg:p-8 min-h-[80vh] max-h-[90vh] overflow-hidden overflow-y-visible">
        <button
          aria-label="Close modal"
          className="absolute top-2 right-2 cursor-pointer bg-red-500 text-white px-2 rounded-md text-sm sm:text-base"
          onClick={handleClose}
        >
          ✕
        </button>

        <div className="mt-6 lg:mt-0">
          <Stepper step={step} totalSteps={totalSteps} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={key}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="mt-10"
          >
            {component ? (
              component
            ) : (
              <RadioGroupStep
                {...stepProps}
                onChange={handleChange}
                onNext={handleNext}
                onPrev={handlePrev}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
