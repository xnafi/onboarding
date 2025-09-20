import { useState, useEffect } from "react";
import Navbar from "../../shared/Navbar";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Button from "../../re-ui/Button";

const WEBHOOK_URL = "https://n8n.quantumos.ai/webhook/onboarding_data/ujerhue";

export default function Dashboard() {
  const [selected, setSelected] = useState(new Date());
  const [loginForm, setLoginForm] = useState({
    email: "",
    meeting_time: "",
    discuss_about: [],
  });

  // Load saved data
  useEffect(() => {
    const savedForm = JSON.parse(localStorage.getItem("onboardingForm")) || {};
    const savedOnboardingData =
      JSON.parse(localStorage.getItem("onboardingData")) || {};

    if (savedForm?.userInfo?.[0]) {
      const { email, meeting_date, meeting_time, discuss_about } =
        savedForm.userInfo[0];
      setLoginForm({
        email: email || "",
        meeting_time: meeting_time || "",
        discuss_about: discuss_about || [],
      });
      if (meeting_date) setSelected(new Date(meeting_date));
    }

    localStorage.setItem(
      "combinedOnboardingData",
      JSON.stringify({ ...savedForm, ...savedOnboardingData })
    );
  }, []);

  const handleLoginChange = (e) => {
    const { name, value, checked, type } = e.target;

    if (type === "checkbox") {
      setLoginForm((prev) => {
        const prevArr = prev[name] || [];
        if (checked) return { ...prev, [name]: [...prevArr, value] };
        else return { ...prev, [name]: prevArr.filter((v) => v !== value) };
      });
    } else {
      setLoginForm({ ...loginForm, [name]: value });
    }
  };

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

    setLoginForm({ email: "", meeting_time: "", discuss_about: [] });
    setSelected(new Date());
  };

  const DISCUSS_OPTIONS = [
    "pricing",
    "timeline/milestone",
    "scope of work",
    "help my business",
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      <Navbar />

      <div className="flex flex-col lg:flex-row justify-center items-center w-full mx-auto mt-10 mb-20 gap-10 max-w-[1440px] px-4">
        {/* Form Card */}
        <div className="w-full lg:w-1/2 bg-white rounded-3xl shadow-lg p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-600 text-center">
            Build My Proposal!
          </h2>

          {/* Discuss Options - Multiple Selection */}
          <div className="flex flex-wrap gap-3 mb-6">
            <h3 className="w-full text-lg md:text-xl font-semibold text-gray-800">
              Let's Discuss
            </h3>
            {DISCUSS_OPTIONS.map((option, idx) => (
              <label
                key={idx}
                className={`cursor-pointer px-2 py-3 rounded-xl border transition-all flex-1 min-w-[140px] text-center text-sm sm:text-base
                  ${
                    loginForm.discuss_about.includes(option)
                      ? "bg-blue-100 border-blue-500 shadow-md font-medium"
                      : "bg-white border-gray-300 hover:shadow"
                  }`}
              >
                <input
                  type="checkbox"
                  name="discuss_about"
                  value={option}
                  checked={loginForm.discuss_about.includes(option)}
                  onChange={handleLoginChange}
                  className="hidden"
                />
                {option}
              </label>
            ))}
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleLoginSubmit}>
            {/* Email */}
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={loginForm.email}
                onChange={handleLoginChange}
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-400 outline-none transition"
                required
              />
            </div>

            {/* Appointment Date */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700 mb-5">
                Would You Like a Casual Appointment?
              </label>
              <Calendar
                onChange={setSelected}
                value={selected}
                minDate={new Date()}
                className="rounded-xl border shadow-sm p-2 mx-auto"
              />
              <p className="text-xs text-gray-500 text-center">
                {selected
                  ? `Selected: ${selected.toLocaleDateString()}`
                  : "Pick a date"}
              </p>
            </div>

            {/* Time */}
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Select Time
              </label>
              <input
                type="time"
                name="meeting_time"
                value={loginForm.meeting_time}
                onChange={handleLoginChange}
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-400 outline-none transition"
                required
              />
            </div>

            {/* Submit */}
            <div className="flex justify-center">
              <Button variant="primary" type="submit">
                SUBMIT
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
