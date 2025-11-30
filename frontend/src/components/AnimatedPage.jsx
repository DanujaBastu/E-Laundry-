import { motion } from "framer-motion";

const animations = {
  initial: { opacity: 0, x: 100 },   // Awal: Transparan & Geser ke Kanan
  animate: { opacity: 1, x: 0 },     // Masuk: Jelas & Posisi Normal
  exit: { opacity: 0, x: -100 },     // Keluar: Transparan & Geser ke Kiri
};

const AnimatedPage = ({ children }) => {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }} // Durasi animasi 0.5 detik
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;