'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export default function ImageLightbox({
  image,
  onClose,
}: {
  image: { src: string; alt: string } | null;
  onClose: () => void;
}) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!image) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [image, onClose]);

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.15 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={image.alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
        >
          <motion.div
            initial={prefersReducedMotion ? false : { scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={prefersReducedMotion ? undefined : { scale: 0.95 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.15 }}
            className="mc-map-frame relative box-content aspect-[16/9] w-[calc(min(95vw,90vh*16/9)-40px)] cursor-zoom-out bg-black md:w-[calc(min(90vw,90vh*16/9)-80px)]"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="90vw"
              className="object-contain [image-rendering:auto]"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
