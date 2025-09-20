import Button from "../../../re-ui/Button";

export default function OnboardingProjectDetails({
  form,
  handleChange,
  handlePrev,
  handleNext,
}) {
  return (
    <div className="flex flex-col items-center max-w-lg justify-center mx-auto px-2 my-4">
      <h2 className="text-2xl font-bold my-3 ">
        Tell me more about your what you need help with to reduce cost and improve your business.
      </h2>
      <textarea
        cols={80}
        rows={15}
        name="projectDetails"
        value={form.projectDetails}
        onChange={handleChange}
        placeholder="There is no wrong answer..."
        className="border p-2 w-full mb-4 shadow-xl/10 rounded-sm ring-1 hover:ring-blue-600 focus:ring-blue-600 outline-none border-none"
      />
      <div className="flex justify-between mt-4 w-full max-w-md">
        <Button
          variant="secondary"
          className="px-4 py-2 rounded"
          onClick={handlePrev}
        >
          Back
        </Button>
        <Button
          className="px-4 py-2 rounded"
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
      {/* <div className="mt-4 text-sm text-gray-600">
        <strong>Collected Data:</strong>
        <pre>{JSON.stringify(form, null, 2)}</pre>
      </div> */}
    </div>
  );
}
