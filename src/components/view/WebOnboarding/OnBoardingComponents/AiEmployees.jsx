import { useState } from "react";
import Button from "../../../re-ui/Button";

export default function AiEmployees({ form, handleChange, handleNext }) {
  const employees = [
    {
      id: 1,
      name: "Alli Ai CO-CEO",
      role: "Helps guide you and run all the workflows 24/7",
      img: "/ai/alfred.png",
    },
    {
      id: 2,
      name: "Get Connected",
      role: "The most cost efficient client capture solution ever",
      img: "/ai/chip.png",
    },
    {
      id: 3,
      name: "Pocket Boss",
      role: "Ai Driven Business in Box",
      img: "/ai/clide.png",
    },
    {
      id: 4,
      name: "Air Assistance",
      role: "Voice Command and control your Ai",
      img: "/ai/millie.png",
    },
    {
      id: 5,
      name: "Affiliate Boss",
      role: "Track your product sales and expand your business",
      img: "/ai/dot.png",
    },
    {
      id: 6,
      name: "Project Boss",
      role: "Manages all your projects/integrates with project boss",
      img: "/ai/millie.png",
    },
    {
      id: 7,
      name: "Number Boss",
      role: "Secure Data Analysis of your Business",
      img: "/ai/millie.png",
    },
  ];

  const [selected, setSelected] = useState(form.aiEmployees || []);

  const toggleSelect = (emp) => {
    const updated = selected.includes(emp.name)
      ? selected.filter((s) => s !== emp.name)
      : [...selected, emp.name];

    setSelected(updated);

    // Save into form
    handleChange({
      target: { name: "aiEmployees", value: updated },
    });
  };

  return (
    <div className="flex flex-col items-center h-full my-4">
      <h2 className="text-2xl font-bold mb-4">
        Finally, let’s set up your AI Employees!
      </h2>
      <p className="text-gray-600 mb-6 text-center max-w-lg">
        AI Employees will take the boring, repeatable tasks off your plate, so
        you can focus on creative and meaningful work!
      </p>

      <div className="flex flex-wrap justify-center gap-4 max-w-4xl w-full h-full">
        {employees.map((emp) => (
          <div
            key={emp.id}
            onClick={() => toggleSelect(emp)}
            className={`flex flex-col items-center p-4 rounded-xl border cursor-pointer transition w-[180px] md:w-[190px] h-[200px] bg-gradient-to-b
              ${
                selected.includes(emp.name)
                  ? "bg-gradient-to-b from-blue-100 to-blue-300 border-blue-500 shadow-md"
                  : "bg-gradient-to-b from-white to-gray-100 border-gray-200 hover:shadow"
              }`}
          >
            {/* <img src={emp.img} alt={emp.name} className="w-20 h-20 mb-3" /> */}
            <div className="flex flex-col justify-between h-full">
              <h3 className="font-semibold">{emp.name}</h3>
              <p className="text-xs text-gray-500 text-center">{emp.role}</p>
            </div>
          </div>
        ))}
      </div>

      <Button
        onClick={handleNext}
        className="px-6 py-2 rounded mt-6"
      >
        Continue
      </Button>
    </div>
  );
}
