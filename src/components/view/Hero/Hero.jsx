import { useState } from "react";
import Modal from "../Modal/Modal";

export default function Hero() {
  // Start open automatically
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex justify-center items-center flex-col h-full w-full">
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
