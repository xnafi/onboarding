import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function GlassCard({
  id,
  onDelete,
  initialWidth = 300,
  initialHeight = 200,
}) {
  const [size, setSize] = useState({ width: initialWidth, height: initialHeight });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [content, setContent] = useState("Edit me...");
  const cardRef = useRef();

  useEffect(() => {
    function handleResize() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle resize
  const handleResize = (e, info) => {
    setSize((prev) => ({
      width: Math.min(
        Math.max(100, prev.width + info.delta.x),
        windowSize.width - position.x
      ),
      height: Math.min(
        Math.max(100, prev.height + info.delta.y),
        windowSize.height - position.y
      ),
    }));
  };

  return (
    <motion.div
      ref={cardRef}
      drag
      dragConstraints={{
        top: 0,
        left: 0,
        right: windowSize.width - size.width,
        bottom: windowSize.height - size.height,
      }}
      dragMomentum={false}
      className="glass-card relative"
      style={{ width: size.width, height: size.height }}
      onDrag={(e, info) => setPosition({ x: info.point.x, y: info.point.y })}
    >
      {/* Delete Button */}
      <button
        onClick={() => onDelete(id)}
        className="absolute top-2 right-2 text-white bg-red-500/70 px-2 py-1 rounded hover:bg-red-600 z-10"
      >
        X
      </button>

      {/* Editable content */}
      <textarea
        className="h-full w-full bg-transparent text-white p-4 resize-none focus:outline-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {/* Resize handle */}
      <motion.div
        drag
        dragMomentum={false}
        dragConstraints={cardRef}
        className="w-6 h-6 bg-white/50 rounded-full absolute bottom-2 right-2 cursor-se-resize z-10"
        onDrag={handleResize}
      />
    </motion.div>
  );
}
