'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const DEFAULT_COLOR = '#C80050';
const DEBOUNCE_DELAY = 300;
const STORAGE_KEY = 'kryo-accent-color';

function getInitialColor() {
  if (typeof window === 'undefined') return DEFAULT_COLOR;
  const saved = localStorage.getItem(STORAGE_KEY);
  return (saved && /^#[0-9A-F]{6}$/i.test(saved)) ? saved : DEFAULT_COLOR;
}

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 200, g: 0, b: 80 };
}

function rgbToHex(r: number, g: number, b: number) {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

function adjustBrightness(r: number, g: number, b: number, factor: number) {
  const newR = Math.max(0, Math.min(255, Math.floor(r * factor)));
  const newG = Math.max(0, Math.min(255, Math.floor(g * factor)));
  const newB = Math.max(0, Math.min(255, Math.floor(b * factor)));
  return rgbToHex(newR, newG, newB);
}

export default function ColorPicker({ onColorChange }: { onColorChange?: (hex: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [rgb, setRgb] = useState(() => hexToRgb(getInitialColor()));
  const [hexInput, setHexInput] = useState(() => getInitialColor());
  const panelRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const hasInitialized = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  const isValidHex = /^#[0-9A-F]{6}$/i.test(hexInput);

  const applyColor = useCallback((r: number, g: number, b: number) => {
    const hex = rgbToHex(r, g, b);
    const dimHex = adjustBrightness(r, g, b, 0.8);
    const darkHex = adjustBrightness(r, g, b, 0.6);

    document.documentElement.style.setProperty('--color-mauve', hex);
    document.documentElement.style.setProperty('--color-mauve-dim', dimHex);
    document.documentElement.style.setProperty('--color-mauve-dark', darkHex);

    if (onColorChange) {
      onColorChange(hex);
    }
  }, [onColorChange]);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      applyColor(rgb.r, rgb.g, rgb.b);
    }
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleSliderChange = (channel: 'r' | 'g' | 'b', value: number) => {
    const newRgb = { ...rgb, [channel]: value };
    setRgb(newRgb);
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    setHexInput(newHex);
    applyColor(newRgb.r, newRgb.g, newRgb.b);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, newHex);
    }, DEBOUNCE_DELAY);
  };

  const handleHexSet = () => {
    if (isValidHex) {
      const newRgb = hexToRgb(hexInput);
      setRgb(newRgb);
      applyColor(newRgb.r, newRgb.g, newRgb.b);
      localStorage.setItem(STORAGE_KEY, hexInput);
    }
  };

  const handleReset = () => {
    const defaultRgb = hexToRgb(DEFAULT_COLOR);
    setRgb(defaultRgb);
    setHexInput(DEFAULT_COLOR);
    applyColor(defaultRgb.r, defaultRgb.g, defaultRgb.b);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div className="relative" ref={panelRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="link-tui">
        [color]
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -10 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.15 }}
            className="absolute top-full left-0 right-0 sm:right-auto sm:left-0 mt-3 p-4 bg-bg-elevated border border-border-subtle w-[calc(100vw-2rem)] sm:w-72 z-50 flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-[30px] text-foreground">Color</span>
              <div
                className="w-6 h-6 border border-border-subtle transition-colors duration-200"
                style={{ backgroundColor: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` }}
              />
            </div>

            <div className="space-y-3">
              {(['r', 'g', 'b'] as const).map((ch) => (
                <div key={ch} className="flex items-center gap-3">
                  <span className="text-[20px] text-muted w-3 uppercase">{ch}</span>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={rgb[ch]}
                    onChange={(e) => handleSliderChange(ch, parseInt(e.target.value))}
                    className={`slider-tui ${ch === 'r' ? 'slider-red' : ch === 'g' ? 'slider-green' : 'slider-blue'}`}
                    aria-label={`${ch} channel: ${rgb[ch]}`}
                  />
                  <span className="text-[20px] text-muted w-8 text-right">{rgb[ch]}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-border-subtle">
              <span className="text-[20px] text-muted">hex</span>
              <input
                type="text"
                value={hexInput}
                onChange={(e) => setHexInput(e.target.value)}
                maxLength={7}
                className={`w-full min-w-0 bg-background border px-2 py-0.5 text-[20px] text-foreground focus:outline-none transition-colors ${
                  isValidHex ? 'border-border-subtle focus:border-mauve' : 'border-red-500 focus:border-red-500'
                }`}
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleHexSet}
                disabled={!isValidHex}
                className="btn-tui btn-tui-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Set
              </button>
              <button onClick={handleReset} className="btn-tui btn-tui-secondary">
                Reset
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
