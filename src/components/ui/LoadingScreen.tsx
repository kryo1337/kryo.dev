'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface LoadingScreenProps {
  loaded: boolean;
  progress: number;
}

export default function LoadingScreen({ loaded, progress }: LoadingScreenProps) {
  useEffect(() => {
    if (!loaded) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [loaded]);

  return (
    <AnimatePresence>
      {!loaded && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 z-[100] bg-neutral-950 p-4 md:p-6 min-h-screen"
        >
          <div className="w-full relative h-[85vh] md:h-[85vh] min-h-[600px] md:w-[75%] mx-auto flex flex-col items-center justify-center pointer-events-none">
            <div className="relative z-20 text-center space-y-6 px-4 mt-51">
              <div className="inline-block">
                <h1 className="text-5xl md:text-8xl tracking-tighter text-white pb-2 drop-shadow-lg font-minecraft">
                  kryo
                </h1>
              </div>

              <div className="flex justify-center pt-4">
                <div className="w-[200px] h-[2px] bg-neutral-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-white"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ type: "tween", ease: "linear" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
