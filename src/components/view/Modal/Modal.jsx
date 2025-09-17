// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  lazy,
  Suspense,
} from "react";
import Stepper from "../../re-ui/Stepper/Stepper";
import RadioGroupStep from "../../re-ui/RadioGroupStep";

const SignUpPage = lazy(() => import("../SignUp/SignUpPage"));

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
  "Manager Of Large Team",
  "Manager Of Small Team",
  "Individual Contributor",
];

const CHALLENGE_OPTIONS = [
  "Getting quality leads consistently",
  "Following up with prospects effectively",
  "Converting leads into paying customers",
  "Managing my sales process",
  "Scaling my business operations",
];

export default function Modal({ isOpen, onClose }) {
  const totalSteps = 3;

  const [step, setStep] = useState(() => {
    return Number(localStorage.getItem("onboardingStep")) || 1;
  });

  const [form, setForm] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("onboardingForm")) || {
        employeeCount: "",
        companyRole: "",
        companyChallenge: "",
      }
    );
  });

  const [showLogin, setShowLogin] = useState(false);

  // Debounce save form
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
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleNext = useCallback(() => {
    setStep((prev) => {
      if (prev === totalSteps) {
        setShowLogin(true);
        return prev;
      }
      return prev + 1;
    });
  }, []);

  const handlePrev = useCallback(() => {
    setStep((prev) => Math.max(1, prev - 1));
  }, []);

  const handleClose = useCallback(() => {
    setStep(1);
    setShowLogin(false);
    setForm({ employeeCount: "", companyRole: "", companyChallenge: "" });
    localStorage.removeItem("onboardingForm");
    localStorage.removeItem("onboardingStep");
    onClose?.();
  }, [onClose]);

  const handleLoginSuccess = useCallback(() => {
    setShowLogin(false);
    setStep(totalSteps);
  }, []);

  const steps = useMemo(
    () => [
      {
        key: "step1",
        title: "Get started with Quantum OS!",
        subtitle: "What size team are you working with?",
        options: EMPLOYEE_OPTIONS,
        name: "employeeCount",
        value: form.employeeCount,
      },
      {
        key: "step2",
        title: "Get started with Quantum OS!",
        subtitle: "What is your role in the company?",
        options: ROLE_OPTIONS,
        name: "companyRole",
        value: form.companyRole,
      },
      {
        key: "step3",
        title: "Get started with Quantum OS!",
        subtitle: `What’s your biggest challenge right now`,
        options: CHALLENGE_OPTIONS,
        name: "companyChallenge",
        value: form.companyChallenge,
      },
    ],
    [form]
  );

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-2"
      onKeyDown={(e) => e.key === "Escape" && handleClose()}
    >
      <div className="bg-white p-4 lg:p-8 rounded-xl shadow-xl relative max-w-2xl w-full min-h-[85vh] overflow-hidden">
        <button
          aria-label="Close modal"
          className="absolute top-1 right-2 cursor-pointer bg-red-500 text-white px-2 rounded-md"
          onClick={handleClose}
        >
          ✕
        </button>

        <AnimatePresence mode="wait">
          {showLogin ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
            >
              <Suspense fallback={<div>Loading...</div>}>
                <SignUpPage onLogin={handleLoginSuccess} />
              </Suspense>
            </motion.div>
          ) : (
            <>
              <Stepper step={step} totalSteps={totalSteps} />
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
              >
                <RadioGroupStep
                  {...steps[step - 1]}
                  onChange={handleChange}
                  onNext={handleNext}
                  onPrev={handlePrev}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
