// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { BrainCircuit, Globe2, Sparkles, Cpu } from "lucide-react";
import Globe from "./globe";


const overviewItems = [
  {
    icon: <BrainCircuit className="w-8 h-8 text-cyan-400" />,
    title: "Transforming Industries",
  },
  {
    icon: <Globe2 className="w-8 h-8 text-purple-400" />,
    title: "Global Reach",
  },
  {
    icon: <Sparkles className="w-8 h-8 text-pink-400" />,
    title: "Human Creativity",
  },
  {
    icon: <Cpu className="w-8 h-8 text-green-400" />,
    title: "Next-Level Computing",
  },
];

export default function AIImpactSection() {
  return (
    <section className="relative h-full w-full flex items-center justify-center overflow-hidden flex-col">
 
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto  text-center">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg"
        >
          AI Impact Overview
        </motion.h2>

        {/* Cards */}
        <div className="mt-2 grid grid-cols-2 gap-2 h-full">
          {overviewItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="relative group backdrop-blur-lg border border-cyan-500/20 p-1 rounded-2xl shadow-lg hover:shadow-cyan-400/40 transition-all"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-500/10 mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-white group-hover:text-cyan-300 transition">
                {item.title}
              </h3>
              <p className="mt-1 text-gray-300 text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
