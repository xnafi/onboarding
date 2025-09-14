import React, { useState } from "react";
import Modal from "../Modal/Modal";


export default function Hero() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-center items-center flex-col h-screen w-full">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsOpen(true)}
      >
        Click Me
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Modal Title</h2>
        <p className="mb-4">This is a modal content.</p>
      </Modal>
    </div>
  );
}
