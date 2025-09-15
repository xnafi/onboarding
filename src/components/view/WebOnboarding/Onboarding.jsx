import { useState, useEffect } from "react";
import OnboardingModal from "./OnboardingModal/OnboardingModal";
import Navbar from "../../shared/Navbar";
import Button from "../../re-ui/Button";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";

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
    <>
      <div className="flex justify-center my-4 w-full">
        <div className="w-full lg:min-w-4xl aspect-[16/9] h-[400px] lg:h-full">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/Io0fBr1XBUA?list=RDIo0fBr1XBUA"
            title="The Chainsmokers - Don't Let Me Down (Official Video) ft. Daya"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <Button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </>,
    <>
      <h2 className="text-2xl font-bold mb-4">
        Lets setup your Quantum account
      </h2>
      <p>Please provide the necessary information to create your account.</p>
      <div className="flex justify-center my-6">
        <img
          src="https://images.pexels.com/photos/33835408/pexels-photo-33835408.jpeg"
          alt="Placeholder"
          className="w-[400px] h-[300px] object-cover rounded"
        />
      </div>
      <div className="flex justify-center mt-4">
        <Button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </>,
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">
        What does your business do? if theres a website, <br /> please share it
        with us.
      </h2>
      <textarea
        rows={5}
        name="website"
        value={form.website}
        onChange={handleChange}
        placeholder="Enter website URL"
        className="border p-2 w-full mb-4 shadow-xl/10 rounded-sm ring-blue-600 hover:ring-black"
      />
      <div className="flex justify-between mt-4 w-full max-w-md">
        <Button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={handlePrev}
        >
          Back
        </Button>
        <Button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </div>,
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">
        what's your role at the company?
      </h2>
      <input
        type="text"
        name="role"
        value={form.role}
        onChange={handleChange}
        placeholder="Enter role"
        className="border p-2 w-full mb-4 shadow-xl/10 rounded-sm ring-blue-600 hover:ring-black"
      />
      <div className="flex justify-between mt-4 w-full max-w-md">
        <Button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={handlePrev}
        >
          Back
        </Button>
        <Button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </div>,
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold my-3">
        Tell me more about your project
      </h2>
      <p className="mb-2">Please provide details about your project.</p>
      <textarea
        cols={80}
        rows={15}
        name="projectDetails"
        value={form.projectDetails}
        onChange={handleChange}
        placeholder="Enter project details"
        className="border p-2 w-full mb-4 shadow-xl/10 rounded-sm ring-blue-600 hover:ring-black"
      />
      <div className="flex justify-between mt-4 w-full max-w-md">
        <Button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={handlePrev}
        >
          Back
        </Button>
        <Button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <strong>Collected Data:</strong>
        <pre>{JSON.stringify(form, null, 2)}</pre>
      </div>
    </div>,
  ];

  // Animation variants
  const variants = {
    enter: (direction) => ({ y: direction > 0 ? 50 : -50, opacity: 0 }),
    center: { y: 0, opacity: 1 },
    exit: (direction) => ({ y: direction > 0 ? -50 : 50, opacity: 0 }),
  };

  return (
    <div className="relative min-h-screen bg-gray-50 flex flex-col">
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
              className="text-center w-full max-w-md"
            >
              {stepContent[currentStep]}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
