import Button from "../../../re-ui/Button";

export default function OnboardingRole({
  form,
  handleChange,
  handlePrev,
  handleNext,
}) {
  return (
    <div className="flex flex-col items-center max-w-md justify-center mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        what's your role at the company?
      </h2>
      <input
        type="text"
        name="role"
        value={form.role}
        onChange={handleChange}
        placeholder="Enter role"
        className="border p-2 w-full mb-4 shadow-xl/10 rounded-sm ring-1 hover:ring-blue-600 focus:ring-blue-600 outline-none border-none"
      />
      <div className="flex justify-between mt-4 w-full ">
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
    </div>
  );
}
