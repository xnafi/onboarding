import { Link } from "react-router";
import logo from "../../assets/logo.png";

export default function Navbar() {
  return (
    <nav className="w-full bg-gray-100 shadow-sm relative z-20">
      <div className="mx-auto max-w-[1440px] flex items-center justify-between px-4 py-3 md:px-8">
        {/* Logo */}

        <Link to="/" className="flex items-center gap-2 mb-auto ">
          <img
            src={logo}
            alt="Logo"
            className="w-14 rounded-full h-14 bg-black"
          />
          <span className="text-xl font-bold ml-2 text-black">
            QuantumOS.ai
          </span>
        </Link>

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
