import { useState } from "react";
import Navbar from "../../shared/Navbar";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import Button from "../../re-ui/Button";

export default function Dashboard() {
  const [selected, setSelected] = useState();
  const [loginForm, setLoginForm] = useState({
    email: "",
    time: "",
  });

  // handle input change
  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  // handle submit
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const formData = {
      ...loginForm,
      date: selected ? selected.toLocaleDateString() : null,
    };

    console.log("Submitted Data:", formData);

    // reset form after submit
    setLoginForm({ email: "", time: "" });
    setSelected(undefined);
  };

  return (
    <div className="relative h-full bg-gray-50 flex flex-col">
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-col justify-center items-center h-full max-w-xl mx-auto mt-20 mb-10 overflow-x-hidden">
        <h2 className="text-2xl lg:text-4xl font-bold mb-4 text-center max-w-lg capitalize">
          Build your proposal
        </h2>

        <form
          className="self-start w-full space-y-4 px-2"
          onSubmit={handleLoginSubmit}
        >
          {/* Email */}
          <div className="flex-1 space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={loginForm.email}
              onChange={handleLoginChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 sm:text-sm ring-1 hover:ring-blue-600 focus:ring-blue-600 outline-none border-none"
              required
            />
          </div>

          {/* Appointment Date */}
          <div className="flex-1 space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Would You Like Casual Appointment?
            </label>
            <DayPicker
              className="border p-2 rounded-xl"
              mode="single"
              selected={selected}
              onSelect={setSelected}
              footer={
                selected
                  ? `Selected: ${selected.toLocaleDateString()}`
                  : "Pick a date."
              }
              disabled={{ before: new Date() }} 
            />
          </div>

          {/* Time */}
          <div className="flex-1 space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Select Time
            </label>
            <input
              type="time"
              name="time"
              value={loginForm.time}
              onChange={handleLoginChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 sm:text-sm ring-1 hover:ring-blue-600 focus:ring-blue-600 outline-none border-none"
              required
            />
          </div>

          {/* Submit */}
          <div className="mx-auto flex justify-center">
            <Button type="submit">SUBMIT</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
