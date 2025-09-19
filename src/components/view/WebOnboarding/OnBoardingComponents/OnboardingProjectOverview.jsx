import Button from "../../../re-ui/Button";

export default function OnboardingProjectOverview({
  projectTitle,
  projectDescription,
  stages,
  form,
  handleChange,
  handleNext,
}) {
  // Handle multiple task selection for Acme Plumber side
  const handleTaskSelect = (stageName, taskName) => {
    const selectedTasks = form[stageName] || [];

    let updatedTasks;
    if (selectedTasks.includes(taskName)) {
      // remove if already selected
      updatedTasks = selectedTasks.filter((t) => t !== taskName);
    } else {
      // add new task
      updatedTasks = [...selectedTasks, taskName];
    }

    handleChange({
      target: {
        name: stageName,
        value: updatedTasks,
      },
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-8 p-1 md:p-6 max-w-6xl w-full mx-auto">
        {/* Left Side: Project Overview */}
        <div className="flex flex-col items-start justify-center">
          <h2 className="text-2xl font-bold mb-2">{projectTitle}</h2>
          <p className="text-gray-600 mb-4 text-left lg:text-base">
            {projectDescription}
          </p>

          <div className="space-y-2 mb-6 grid grid-cols-1 md:grid-cols-3 min-h-md md:gap-4">
            {stages.map((stage) => (
              <span
                key={stage.name}
                className="inline-block px-3 py-1 rounded-full text-sm text-white md:text-lg"
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

        {/* Right Side: Acme Plumber - multiple select */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-left">
         Get Connected
          </h3>

          <div className="space-y-6 text-left max-w-2xl flex flex-col">
            {stages.map((stage) => (
              <div key={stage.name}>
                <h4
                  className="font-semibold mb-2 text-lg"
                  style={{ color: stage.color }}
                >
                  {stage.name}
                </h4>
                <ul className="space-y-2 text-right">
                  {stage.tasks.map((task, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between items-center border-b border-gray-200 pb-1 hover:scale-[1.01] transition-all duration-500"
                    >
                      <label className="flex justify-between items-center w-full cursor-pointer space-x-2">
                        <div className="flex justify-start items-start text-start space-x-2">
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
              </div>
            ))}
          </div>
        </div>

        <Button
          onClick={handleNext}
          className="bg-blue-500 text-white px-6 py-2 rounded self-start w-1/2 lg:w-1/6 mb-5"
        >
          Continue
        </Button>
      </div>
    </>
  );
}
