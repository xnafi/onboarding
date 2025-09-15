import Button from "../../../re-ui/Button";

export default function SetupAccount({handleNext}) {
  return (
    <div>
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
    </div>
  );
}
