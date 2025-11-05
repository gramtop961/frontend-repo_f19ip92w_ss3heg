import React from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

const Hero3D = () => {
  return (
    <section className="relative h-[340px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/9aY0vE0eA3o8bA7y/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/40 to-white pointer-events-none" />
      <div className="relative h-full max-w-5xl mx-auto px-4 flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="backdrop-blur-sm bg-white/60 border border-white/40 shadow-sm rounded-2xl p-5 sm:p-6"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Ordena con estilo</h2>
          <p className="mt-1 text-gray-600 max-w-prose">
            Disfruta una experiencia moderna con 3D y animaciones suaves. Tu pedido llega más rápido que nunca.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero3D;
