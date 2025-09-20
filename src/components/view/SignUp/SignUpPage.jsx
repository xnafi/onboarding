import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router";

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
      <div className="w-full max-w-md bg-transparent rounded-lg">
        {/* Logo */}
        <div className="flex h-full max-w-[410px] flex-col gap-y-4">
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
          <h1 className="text-2xl font-bold mb-2">
            👋 Build Your Free Proposal Today
          </h1>
        
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

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
