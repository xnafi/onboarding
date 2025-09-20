import { useState, useEffect } from "react";
import Navbar from "../../shared/Navbar";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import Button from "../../re-ui/Button";

const WEBHOOK_URL = "https://n8n.quantumos.ai/webhook/onboarding_data";

// Dummy options for radio button section
const RADIO_OPTIONS = ["Option 1", "Option 2", "Option 3"];

export default function Dashboard() {
  const [selected, setSelected] = useState();
  const [loginForm, setLoginForm] = useState({
    email: "",
    meeting_time: "",
    radioSelection: "", // for dummy radio buttons
  });

  // Load saved data from localStorage
  useEffect(() => {
    const savedForm = JSON.parse(localStorage.getItem("onboardingForm")) || {};
    const savedOnboardingData =
      JSON.parse(localStorage.getItem("onboardingData")) || {};

    if (savedForm?.userInfo?.[0]) {
      const { email, meeting_date, meeting_time, radioSelection } =
        savedForm.userInfo[0];
      setLoginForm({
        email: email || "",
        meeting_time: meeting_time || "",
        radioSelection: radioSelection || "",
      });
      if (meeting_date) setSelected(new Date(meeting_date));
    }

    localStorage.setItem(
      "combinedOnboardingData",
      JSON.stringify({ ...savedForm, ...savedOnboardingData })
    );
  }, []);

  // Handle input change
  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  // Send data to webhook
  const sendDataToWebhook = async (data) => {
    try {
      const existingData =
        JSON.parse(localStorage.getItem("onboarding_form_user_data")) || [];
      existingData.push(data);
      localStorage.setItem(
        "onboarding_form_user_data",
        JSON.stringify(existingData)
      );

      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(existingData),
      });

      if (response.ok) console.log("Onboarding data sent successfully!");
      else console.error("Failed to send onboarding data");
    } catch (err) {
      console.error("Error sending onboarding data:", err);
    }
  };

  // Handle submit
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const onboardingForm = JSON.parse(
      localStorage.getItem("onboardingForm")
    ) || {
      employeeCount: "",
      companyRole: "",
      companyChallenge: [],
      userInfo: [{}],
    };
    const onboardingData =
      JSON.parse(localStorage.getItem("onboardingData")) || {};

    const formData = {
      ...onboardingForm.userInfo[0],
      ...onboardingData,
      ...loginForm,
      meeting_date: selected ? selected.toISOString() : null,
    };

    onboardingForm.userInfo[0] = formData;
    localStorage.setItem("onboardingForm", JSON.stringify(onboardingForm));

    sendDataToWebhook(formData);

    setLoginForm({ email: "", meeting_time: "", radioSelection: "" });
    setSelected(undefined);
  };

  return (
    <div className="relative h-full bg-gray-50 flex flex-col">
      <Navbar />

      <div className="flex flex-col justify-center items-center h-full max-w-xl mx-auto mt-20 mb-10 overflow-x-hidden">
        <h2 className="text-2xl lg:text-4xl font-bold mb-4 text-center max-w-lg capitalize text-blue-500">
          Build My Proposal!
        </h2>

        {/* Dummy Radio Button Section */}
        <div className="w-full mb-6">
          <span className="block text-sm font-medium text-gray-700 mb-2 px-2">
            Choose an option
          </span>

          {RADIO_OPTIONS.map((option, idx) => (
            <label
              key={idx}
              className={`flex items-center mb-1 px-2 cursor-pointer rounded-md`}
            >
              <input
                type="radio"
                name="radioSelection"
                value={option}
                checked={loginForm.radioSelection === option}
                onChange={handleLoginChange}
                className="h-4 w-4 text-blue-600 border-gray-300"
              />
              <span className="ml-2 text-gray-700">{option}</span>
            </label>
          ))}
        </div>

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
              name="meeting_time"
              value={loginForm.meeting_time}
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
