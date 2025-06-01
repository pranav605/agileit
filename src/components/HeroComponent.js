

import { motion } from "framer-motion";

const HeroComponent = () => {
  const images = [
    {
      src: "/images/img1.png",
    },
    {
      src: "/images/img2.png",
    },
    {
      src: "/images/img3.png",
    },
  ];

  // Overlap offsets for each image
  const overlapStyles = [
    "z-30 left-0 rotate-[-10deg]",
    "z-20 left-12 rotate-[0deg]",
    "z-10 left-24 rotate-[10deg]",
  ];

  return (
    <section className="relative w-full bg-black text-white px-6 py-20 min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Hero Text */}
      <div className="text-center max-w-4xl mb-20 z-20">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Plan. Track. Ship.</h1>
        <p className="text-lg text-gray-400">Manage your projects visually with ease.</p>
      </div>

      {/* Overlapping Images */}
      <div className="relative flex justify-center items-center w-[400px] h-[260px] mx-auto">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className={`absolute top-0 ${overlapStyles[index]} transition-transform duration-500 rounded-2xl overflow-hidden border-4 border-white shadow-xl h-60 w-60`}
            initial={{
              scale: 0.8,
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              scale: 1,
              opacity: 1,
              y: 0,
            }}
            transition={{ duration: 0.8, delay: index * 0.15 }}
            viewport={{ once: true }}
          >
            <img
              src={image.src}
              alt={`img${index}`}
              className="w-full h-full object-cover rounded-2xl"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HeroComponent;