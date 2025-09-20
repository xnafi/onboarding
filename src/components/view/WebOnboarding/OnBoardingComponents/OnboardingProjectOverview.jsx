import { useEffect, useState } from "react";
import Button from "../../../re-ui/Button";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";

export default function OnboardingProjectOverview({
  projectTitle,
  projectDescription,
  stages,
  form,
  handleChange,
  handleNext,
}) {
  const [stagePage, setStagePage] = useState(0); // current 3-stage group

  // Handle multiple task selection
  const handleTaskSelect = (stageName, taskName) => {
    const selectedTasks = form[stageName] || [];
    const updatedTasks = selectedTasks.includes(taskName)
      ? selectedTasks.filter((t) => t !== taskName)
      : [...selectedTasks, taskName];

    const updatedForm = { ...form, [stageName]: updatedTasks };

    handleChange({ target: { name: stageName, value: updatedTasks } });
    localStorage.setItem("onboardingData", JSON.stringify(updatedForm));
  };

  // Persist whenever form changes
  useEffect(() => {
    localStorage.setItem("onboardingData", JSON.stringify(form));
  }, [form]);

  // Group stages into chunks of 3
  const stageGroups = [];
  for (let i = 0; i < stages.length; i += 2) {
    stageGroups.push(stages.slice(i, i + 2));
  }

  const handleContinue = () => {
    if (stagePage === stageGroups.length - 1) {
      localStorage.setItem("onboardingData", JSON.stringify(form));
      handleNext();
    } else {
      setStagePage((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (stagePage > 0) setStagePage((prev) => prev - 1);
  };

  return (
    <div className="flex flex-col gap-8 p-1 md:p-6 max-w-6xl w-full mx-auto">
      {/* Section 1: Project Info */}
      <div className="flex flex-col items-start justify-center">
        <h2 className="text-3xl lg:text-5xl font-bold mb-2">{projectTitle}</h2>
        <p className="text-gray-600 mb-4 text-left lg:text-base">
          {projectDescription}
        </p>

        <div className="space-y-2 mb-6 grid grid-cols-1 md:grid-cols-3 min-h-md md:gap-4 place-items-center justify-start items-start">
          {stages.map((stage) => (
            <span
              key={stage.name}
              className="inline-block px-3 py-1 rounded-full text-sm text-white md:text-lg h-10 w-full"
              style={{ backgroundColor: stage.color }}
            >
              {stage.name}
            </span>
          ))}
        </div>

        <p className="text-gray-500 mb-2 text-sm text-start">
          Stages help break your project into milestones so everyone can keep
          track of the status.
        </p>
      </div>

      {/* Section 2: Stage Group */}
      <div className="space-y-6">
        <h3 className="text-2xl lg:text-3xl font-semibold mb-4 text-left">
          Business Automation Solutions - Select Your Priorities
        </h3>
        <p className="text-sm lg:text-base font-semibold mb-4 text-left">
          Choose the automation areas most important to your business growth:
        </p>

        {/* Animate entire page group */}
        <AnimatePresence mode="wait">
          <motion.div
            key={stagePage}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            layout
          >
            {stageGroups[stagePage].map((stage) => (
              <motion.div key={stage.name} layout className="mb-4">
                <h4
                  className="font-semibold mb-2 text-lg lg:text-xl text-left"
                  style={{ color: stage.color }}
                >
                  {stage.name}
                </h4>
                <ul className="space-y-2">
                  {stage.tasks.map((task, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between items-center border-b border-gray-200 pb-1 hover:scale-[1.01] transition-all duration-500"
                    >
                      <label className="flex justify-between items-center w-full cursor-pointer space-x-2">
                        <div className="flex items-start text-start space-x-2">
                          <input
                            type="checkbox"
                            checked={
                              form[stage.name]?.includes(task.task) || false
                            }
                            onChange={() =>
                              handleTaskSelect(stage.name, task.task)
                            }
                            className="ml-2 h-4 w-4 appearance-none rounded-full border border-gray-400 checked:bg-blue-500 cursor-pointer"
                          />
                          <span className="text-[10px] md:text-sm">
                            {task.task}
                          </span>
                        </div>
                        <span className="bg-gray-100 px-2 py-1 rounded text-[10px] md:text-sm ml-2">
                          {task.role}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Section 3: Navigation */}
        <div className="flex gap-4 mt-6">
          {stagePage > 0 && (
            <Button
              onClick={handleBack}
              className="bg-gray-300 text-black px-6 py-2 rounded w-1/2 lg:w-1/6"
            >
              Back
            </Button>
          )}
          <Button
            onClick={handleContinue}
            variant="primary"
            className="bg-blue-500 text-white px-6 py-2 rounded w-1/2 lg:w-1/6"
          >
            {stagePage === stageGroups.length - 1 ? "Continue" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}
