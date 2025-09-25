import Button from "../../../re-ui/Button";

export default function DescribeBusiness({
  form,
  handleChange,
  handlePrev,
  handleNext,
}) {
  return (
    <div className="flex flex-col items-center px-2 max-w-lg justify-center mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center max-w-lg capitalize">
        What does your business do? If there’s a website, please share it with
        us.
      </h2>

      <textarea
        rows={5}
        name="business_name"
        value={form.business_name}
        onChange={handleChange}
        placeholder="Tell me about your business.."
        className="border p-2 w-full max-w-md mb-4 shadow-md rounded-md ring-1 hover:ring-blue-600 focus:ring-blue-600 outline-none border-none"
      />

      <textarea
        rows={2}
        name="business_web"
        value={form.business_web}
        onChange={handleChange}
        placeholder="Enter website"
        className="border p-2 w-full max-w-md mb-4 shadow-md rounded-md ring-1 hover:ring-blue-600 focus:ring-blue-600 outline-none border-none"
      />

      <div className="flex justify-between mt-4 w-full max-w-md">
        <Button variant="secondary" className="px-4 py-2 rounded" onClick={handlePrev}>
          Back
        </Button>
        <Button className="px-4 py-2 rounded" onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
}
