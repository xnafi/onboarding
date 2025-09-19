import { useState } from "react";
import Button from "../../../re-ui/Button";

export default function AiEmployees({ form, handleChange, handleNext }) {
  const employees = [
    {
      id: 1,
      name: "Alfred",
      role: "AI Executive Assistant",
      img: "/ai/alfred.png",
    },
    {
      id: 2,
      name: "Chip",
      role: "AI Sales Representative",
      img: "/ai/chip.png",
    },
    {
      id: 3,
      name: "Clide",
      role: "AI Customer Support Specialist",
      img: "/ai/clide.png",
    },
    { id: 4, name: "Dot", role: "AI Recruiter", img: "/ai/dot.png" },
    {
      id: 5,
      name: "Millie",
      role: "AI Project Manager",
      img: "/ai/millie.png",
    },
    { id: 6, name: "Spec", role: "AI Researcher", img: "/ai/spec.png" },
    {
      id: 7,
      name: "Suki",
      role: "AI Marketing Associate",
      img: "/ai/suki.png",
    },
  ];

  const [selected, setSelected] = useState(form.aiEmployees || []);

  const toggleSelect = (id) => {
    const updated = selected.includes(id)
      ? selected.filter((s) => s !== id)
      : [...selected, id];

    setSelected(updated);

    // ✅ Save into form
    handleChange({
      target: { name: "aiEmployees", value: updated },
    });
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">
        Finally, let’s set up your AI Employees!
      </h2>
      <p className="text-gray-600 mb-6 text-center max-w-lg">
        AI Employees will take the boring, repeatable tasks off your plate, so
        you can focus on creative and meaningful work!
      </p>

      <div className="flex flex-wrap justify-center gap-4 max-w-4xl w-full">
        {employees.map((emp) => (
          <div
            key={emp.id}
            onClick={() => toggleSelect(emp.id)}
            className={`flex flex-col items-center p-4 rounded-xl border cursor-pointer transition w-full md:w-[190px] bg-gradient-to-b
              ${
                selected.includes(emp.id)
                  ? "bg-gradient-to-b from-blue-100 to-blue-300 border-blue-500 shadow-md"
                  : "bg-gradient-to-b from-white to-gray-100 border-gray-200 hover:shadow"
              }`}
          >
            <img src={emp.img} alt={emp.name} className="w-20 h-20 mb-3" />
            <h3 className="font-semibold">{emp.name}</h3>
            <p className="text-xs text-gray-500 text-center">{emp.role}</p>
          </div>
        ))}
      </div>

      <Button
        onClick={handleNext}
        className="bg-blue-500 text-white px-6 py-2 rounded mt-6"
      >
        Continue
      </Button>
      {/* Display collected form data */}
      {/* <div className="mt-4 text-sm text-gray-600">
        <strong>Collected Data:</strong>
        <pre>{JSON.stringify(form, null, 2)}</pre>
      </div> */}
    </div>
  );
}
