// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";

// Red, Yellow, Green, Blue, Purple
const colors = ["#F87171", "#FBBF24", "#34D399", "#60A5FA", "#A78BFA"];

export default function Celebration() {
  const particles = 200; // Number of confetti pieces

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex flex-col items-center justify-center bg-black/70 z-50 w-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Confetti particles */}
        {[...Array(particles)].map((_, i) => {
          const randomX = (Math.random() - 0.5) * 800;
          const randomY = -Math.random() * 600; // start above screen
          const randomRotation = Math.random() * 360;
          const randomScale = Math.random() * 0.8 + 0.5;
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          const duration = Math.random() * 2 + 1; // 1-3 seconds
          const delay = Math.random() * 0.5;

          return (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{ backgroundColor: randomColor }}
              initial={{ x: 0, y: 0, rotate: 0, scale: 0 }}
              animate={{
                x: randomX,
                y: randomY + 600,
                rotate: randomRotation,
                scale: randomScale,
                opacity: [1, 0],
              }}
              transition={{ duration, delay, ease: "easeOut" }}
            />
          );
        })}

        {/* Celebration message */}
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg text-center mt-10"
          initial={{ scale: 0, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
        >
          🎉 Congratulations! 🎉
          <br />
          You did it!
        </motion.h1>
        <motion.h1
          className="text-xl md:text-xl font-extrabold text-white drop-shadow-lg text-center mt-10"
          initial={{ scale: 0, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
        >
          Hang on, we will navigate to you success
     
        </motion.h1>

        {/* Floating sparkles */}
        {[...Array(100)].map((_, i) => {
          const randomX = (Math.random() - 0.5) * 800;
          const randomY = (Math.random() - 0.5) * 400;
          const size = Math.random() * 20 + 2;
          const color = colors[Math.floor(Math.random() * colors.length)];

          return (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute rounded-full"
              style={{ width: size, height: size, backgroundColor: color }}
              initial={{ opacity: 0 }}
              animate={{
                x: randomX,
                y: randomY,
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0],
              }}
              transition={{
                duration: Math.random() * 2 + 1,
                repeat: Infinity,
                delay: Math.random(),
              }}
            />
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
}
