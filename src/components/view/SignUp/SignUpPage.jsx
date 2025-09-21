import { useState, useEffect } from "react";
import logo from "../../../assets/logo.png";
import Button from "../../re-ui/Button";
import { useNavigate } from "react-router";

export default function SignUpPage({ form, handleChange }) {
  const [otpSent, setOtpSent] = useState(
    () => JSON.parse(localStorage.getItem("otpSent")) || false
  );
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  // Sync otpSent with localStorage
  useEffect(() => {
    localStorage.setItem("otpSent", JSON.stringify(otpSent));
  }, [otpSent]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (!otpSent) {
      // Save user info
      const updatedForm = {
        ...form,
        userInfo: [
          {
            firstName: form.firstName || "",
            lastName: form.lastName || "",
            phone: form.phone || "",
          },
        ],
      };
      localStorage.setItem("onboardingForm", JSON.stringify(updatedForm));

      // Simulate sending OTP
      console.log("OTP sent to:", form.phone);
      setOtpSent(true);
      return;
    }

    // OTP verification
    if (otp.length === 4) {
      console.log("OTP Verified:", otp);

      // ✅ Clear OTP state when done
      localStorage.removeItem("otpSent");

      navigate("/web-onboarding");
    } else {
      alert("Please enter a valid 4-digit OTP.");
    }
  };

  return (
    <div className="flex items-center justify-center h-full bg-transparent">
      <div className="w-full max-w-lg bg-transparent rounded-lg">
        {/* Logo */}
        <div className="flex h-full max-w-[600px] flex-col gap-y-4">
          <div className="flex items-center gap-2 mb-auto">
            <img
              src={logo}
              alt="Logo"
              className="w-14 rounded-full h-14 bg-black"
            />
            <span className="text-xl font-bold ml-2 text-black">
              QuantumOS.ai
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold">
            👋 Unlock Your Custom QuantumOS.ai Proposal
          </h1>
          <p className="font-semibold mb-2">
            {otpSent
              ? "Enter the OTP sent to your phone to continue."
              : "Based on your needs, we're crafting a personalized plan to boost your business. Just a few details and you'll get instant access to your tailored strategy and pricing."}
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleLoginSubmit}>
          {!otpSent ? (
            <>
              {/* First + Last Name */}
              <div className="flex space-x-3">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName || ""}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-black focus:border-black sm:text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName || ""}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-black focus:border-black sm:text-sm"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={form.phone || ""}
                  onChange={handleChange}
                  placeholder="Phone number"
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-black focus:border-black sm:text-sm"
                />
              </div>
            </>
          ) : (
            <>
              {/* OTP Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Enter OTP
                </label>
                <input
                  type="text"
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="4-digit OTP"
                  maxLength={4}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-black focus:border-black sm:text-sm tracking-widest text-center"
                />
              </div>
            </>
          )}

          <Button type="submit" className="w-full py-2 ">
            {otpSent ? "Verify OTP" : "Submit And Get OTP"}
          </Button>
        </form>
      </div>
    </div>
  );
}
