import { useState } from "react";
import Modal from "../Modal/Modal";

export default function Hero() {
  // Start open automatically
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex justify-center items-center flex-col h-screen w-full">
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Modal Title</h2>
        <p className="mb-4">This is a modal content.</p>
      </Modal>
    </div>
  );
}
