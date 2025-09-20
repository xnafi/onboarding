import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router";
import Button from "../../re-ui/Button";

export default function SignUpPage({ form, handleChange }) {
  const navigate = useNavigate();

  // Handle form submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    // Save user info to onboarding form
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

    navigate("/web-onboarding");
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
            Based on your needs, we're crafting a personalized plan to boost
            your business. Just a few details and you'll get instant access to
            your tailored strategy and pricing." (This sets expectations,
            explains the "why," and emphasizes speed.)
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleLoginSubmit}>
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

          <Button
            type="submit"
            className="w-full py-2 "
          >
            Get My Custom Proposal
          </Button>
        </form>
      </div>
    </div>
  );
}
