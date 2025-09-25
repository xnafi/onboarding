import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Button from "../../re-ui/Button";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const WEBHOOK_URL =
  "https://onbording-backend.dev.quantumos.ai/api/proposal/create";

export default function Dashboard() {
  const [selected, setSelected] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [loginForm, setLoginForm] = useState({
    email: "",
    meeting_time: "",
    discuss_topic: [],
  });

  const DISCUSS_OPTIONS = [
    "pricing",
    "timeline/milestone",
    "scope of work",
    "help my business",
  ];

  // Handle input changes
  const handleLoginChange = (e) => {
    const { name, value } = e.target;

    if (name === "discuss_about") {
      setLoginForm((prev) => {
        const exists = prev.discuss_topic.includes(value);
        return {
          ...prev,
          discuss_topic: exists
            ? prev.discuss_topic.filter((v) => v !== value)
            : [...prev.discuss_topic, value],
        };
      });
    } else {
      setLoginForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Convert "HH:mm" to "hh:mmAM/PM"
  const formatTime = (time) => {
    if (!time) return "";
    const [hour, minute] = time.split(":").map(Number);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    return `${hour12.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}${ampm}`;
  };

  // Merge selected date + meeting_time into ISO string
  const getDiscussDateTime = () => {
    if (!selected || !loginForm.meeting_time) return "";
    const [hours, minutes] = loginForm.meeting_time.split(":").map(Number);
    const date = new Date(selected);
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.toISOString();
  };

  // Handle form submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      email: loginForm.email,
      discuss_topic: loginForm.discuss_topic,
      discuss_date: getDiscussDateTime(),
      discuss_time: formatTime(loginForm.meeting_time),
    };

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to create proposal");

      const responseData = await res.json();
      console.log("✅ Proposal created successfully", responseData);

      // Show popup
      setIsPopupOpen(true);

      // Navigate after 3 seconds
      setTimeout(() => {
        window.location.href = "https://www.quantumos.ai/";
      }, 3000);
    } catch (err) {
      console.error("❌ Error submitting proposal:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      <div className="flex flex-col lg:flex-row justify-center items-center w-full mx-auto mt-10 mb-20 gap-10 max-w-[1440px] px-4">
        {/* Form Card */}
        <div className="w-full lg:w-1/2 bg-white rounded-3xl shadow-lg p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-600 text-center">
            Build My Proposal!
          </h2>

          {/* Discuss Options */}
          <div className="flex flex-wrap gap-3 mb-6">
            <h3 className="w-full text-lg md:text-xl font-semibold text-gray-800">
              Let's Discuss
            </h3>
            {DISCUSS_OPTIONS.map((option, idx) => (
              <label
                key={idx}
                className={`cursor-pointer px-2 py-3 rounded-xl border transition-all flex-1 min-w-[140px] text-center text-sm sm:text-base
                  ${
                    loginForm.discuss_topic.includes(option)
                      ? "bg-blue-100 border-blue-500 shadow-md font-medium"
                      : "bg-white border-gray-300 hover:shadow"
                  }`}
              >
                <input
                  type="checkbox"
                  name="discuss_about"
                  value={option}
                  checked={loginForm.discuss_topic.includes(option)}
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
                value={loginForm.meeting_time || ""}
                onChange={handleLoginChange}
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-400 outline-none transition"
                required
              />
            </div>

            {/* Submit */}
            <div className="flex justify-center">
              <Button
                variant="primary"
                type="submit"
                className="w-full py-2"
                disabled={loading}
              >
                {loading ? "Submitting..." : "SUBMIT"}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Popup */}
      <Popup open={isPopupOpen} closeOnDocumentClick={false} modal>
        <div className="p-6 text-center">
          <h2 className="text-xl font-bold mb-4">✅ Proposal Submitted!</h2>
          <p>Your proposal has been submitted successfully. Redirecting...</p>
        </div>
      </Popup>
    </div>
  );
}
