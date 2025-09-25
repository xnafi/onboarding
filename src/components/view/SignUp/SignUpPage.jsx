import { useState } from "react";
import logo from "../../../assets/logo.png";
import Button from "../../re-ui/Button";
import { useNavigate } from "react-router";

export default function SignUpPage({ form, handleChange }) {
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Step Send OTP
  const sendOtp = async () => {
    try {
      setLoading(true);
      const resOtp = await fetch(
        "https://onbording-backend.dev.quantumos.ai/api/onboard/send-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: form.email, phone: form.phone }),
        }
      );
      const dataOtp = await resOtp.json();
      console.log("OTP send response:", dataOtp);

      if (!resOtp.ok) {
        if (dataOtp.err?.code === "P2002") {
          console.log("OTP already exists, proceed to OTP input.");
          setOtpSent(true);
        } else {
          console.log("Failed to send OTP:", dataOtp.message);
        }
        return;
      }

      setOtpSent(true);
    } catch (error) {
      console.log("Error sending OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP and send user info
  const verifyOtp = async () => {
    if (!otp) {
      console.log("OTP is required.");
      return;
    }

    try {
      setLoading(true);

      // Verify OTP
      const resVerify = await fetch(
        "https://onbording-backend.dev.quantumos.ai/api/onboard/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: form.email, otp }),
        }
      );

      const dataVerify = await resVerify.json();
      console.log("OTP verification response:", dataVerify);

      if (
        resVerify.ok &&
        dataVerify.core === 200 &&
        dataVerify.message === "OTP Verified successfully"
      ) {
        // OTP verified Send user info
        const userInfoPayload = {
          first_name: form.firstName || "",
          last_name: form.lastName || "",
          email: form.email || "",
          phone: form.phone || "",
          broker_name: form.broker_name || "",
          team_name: form.team_name || "",
          website: form.website || "",
          fb: form.facebook || "",
          insta: form.ig || "",
        };

        const resUser = await fetch(
          "https://onbording-backend.dev.quantumos.ai/api/onboard/userinfo",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userInfoPayload),
          }
        );

        const dataUser = await resUser.json();
        console.log("User info response:", dataUser);

        if (resUser.ok) {
          setOtp("");
          setOtpSent(false);
          navigate("/web-onboarding");
        } else {
          console.log("Failed to send user info:", dataUser);
        }
      } else {
        console.log("OTP verification failed:", dataVerify);
      }
    } catch (error) {
      console.log("Error during OTP verification or sending user info:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    otpSent ? verifyOtp() : sendOtp();
  };

  return (
    <div className="flex items-center justify-center h-full bg-transparent">
      <div className="w-full max-w-lg bg-transparent rounded-lg">
        {/* Logo & Title */}
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
          <h1 className="text-2xl font-bold">
            👋 Unlock Your Custom QuantumOS.ai Proposal
          </h1>
          <p className="font-semibold mb-2">
            {otpSent
              ? "Enter the OTP sent to your email to continue."
              : "Fill out your details and receive a personalized strategy instantly."}
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {!otpSent ? (
            <>
              {/* Input fields */}
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

              <div className="flex space-x-3">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email || ""}
                    onChange={handleChange}
                    placeholder="Email address"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-black focus:border-black sm:text-sm"
                  />
                </div>
                <div className="flex-1">
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
              </div>

              {/* Broker & Team */}
              <div className="flex space-x-3">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Broker Name
                  </label>
                  <input
                    type="text"
                    name="broker_name"
                    value={form.broker_name || ""}
                    onChange={handleChange}
                    placeholder="Broker name"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-black focus:border-black sm:text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Team Name
                  </label>
                  <input
                    type="text"
                    name="team_name"
                    value={form.team_name || ""}
                    onChange={handleChange}
                    placeholder="Team name"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-black focus:border-black sm:text-sm"
                  />
                </div>
              </div>

              {/* Website & Facebook */}
              <div className="flex space-x-3">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={form.website || ""}
                    onChange={handleChange}
                    placeholder="https://example.com"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-black focus:border-black sm:text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Facebook
                  </label>
                  <input
                    type="url"
                    name="facebook"
                    value={form.facebook || ""}
                    onChange={handleChange}
                    placeholder="Facebook profile link"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-black focus:border-black sm:text-sm"
                  />
                </div>
              </div>

              {/* Instagram */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Instagram
                </label>
                <input
                  type="url"
                  name="ig"
                  value={form.ig || ""}
                  onChange={handleChange}
                  placeholder="Instagram profile link"
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
                  maxLength={5}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-black focus:border-black sm:text-sm tracking-widest text-center"
                />
              </div>
            </>
          )}

          <Button type="submit" className="w-full py-2" disabled={loading}>
            {loading ? "Processing..." : otpSent ? "Verify OTP" : "Send OTP"}
          </Button>
        </form>
      </div>
    </div>
  );
}
