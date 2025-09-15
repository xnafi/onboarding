import logo from "../../assets/logo.png";
import Stepper from "../view/Stepper/Stepper";
export default function Navbar() {
  const step = 5;
  return (
    <nav className="w-full border-b bg-white shadow-sm relative z-20">
      <div className="mx-auto max-w-[1440px] flex items-center justify-between px-4 py-3 md:px-8">
        {/* Logo */}

        <div className="flex items-center gap-2 mb-auto ">
          <img
            src={logo}
            alt="Logo"
            className="w-14 rounded-full h-14 bg-black"
          />
          <span className="text-xl font-bold ml-2 text-black">
            QuantumOS.ai
          </span>
        </div>
        <div>
          <Stepper step={step} totalSteps={2} className="bg-amber-800" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <a
            href="#support"
            className="flex items-center gap-1 text-gray-700 hover:text-blue-600"
          >
            Support
          </a>
          <a
            href="#account"
            className="flex items-center gap-1 text-gray-700 hover:text-blue-600"
          >
            Account
          </a>
        </div>
      </div>
    </nav>
  );
}
