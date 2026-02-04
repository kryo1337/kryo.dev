'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Palette, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    <div className="relative font-space" ref={panelRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-muted hover:text-mauve transition-colors duration-200"
      >
        <Palette size={20} className="w-5 h-5" />
        <span className="text-xs font-medium tracking-wide hidden sm:inline">COLOR PICKER</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 sm:right-auto sm:left-0 mt-3 sm:mt-4 p-4 sm:p-5 bg-bg-elevated-2 border border-border-subtle rounded-xl shadow-xl w-[calc(100vw-2rem)] sm:w-72 z-50 flex flex-col gap-3 sm:gap-4"
          >
            <div className="flex items-center justify-between mb-1 sm:mb-2">
               <span className="text-xs font-semibold text-muted uppercase tracking-wider">Edit Color</span>
               <div
                 className="w-6 h-6 sm:w-8 sm:h-8 rounded-md border border-border-subtle shadow-sm transition-colors duration-200"
                 style={{ backgroundColor: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` }}
               />
            </div>

            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-[10px] sm:text-xs text-muted font-mono w-3">R</span>
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={rgb.r}
                  onChange={(e) => handleSliderChange('r', parseInt(e.target.value))}
                  className="flex-1 h-1.5 bg-bg-elevated rounded-lg appearance-none cursor-pointer slider-red"
                  aria-label={`Red channel: ${rgb.r}`}
                />
                <span className="text-[10px] sm:text-xs text-muted font-mono w-5 sm:w-6 text-right">{rgb.r}</span>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-[10px] sm:text-xs text-muted font-mono w-3">G</span>
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={rgb.g}
                  onChange={(e) => handleSliderChange('g', parseInt(e.target.value))}
                  className="flex-1 h-1.5 bg-bg-elevated rounded-lg appearance-none cursor-pointer slider-green"
                  aria-label={`Green channel: ${rgb.g}`}
                />
                <span className="text-[10px] sm:text-xs text-muted font-mono w-5 sm:w-6 text-right">{rgb.g}</span>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-[10px] sm:text-xs text-muted font-mono w-3">B</span>
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={rgb.b}
                  onChange={(e) => handleSliderChange('b', parseInt(e.target.value))}
                  className="flex-1 h-1.5 bg-bg-elevated rounded-lg appearance-none cursor-pointer slider-blue"
                  aria-label={`Blue channel: ${rgb.b}`}
                />
                <span className="text-[10px] sm:text-xs text-muted font-mono w-5 sm:w-6 text-right">{rgb.b}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-1 sm:mt-2 pt-3 sm:pt-4 border-t border-border-subtle">
              <span className="text-xs text-muted font-mono">HEX:</span>
              <input
                type="text"
                value={hexInput}
                onChange={(e) => setHexInput(e.target.value)}
                maxLength={7}
                className={`w-full bg-bg-elevated border rounded px-2 py-1 text-xs text-foreground font-mono focus:outline-none transition-colors ${
                  isValidHex ? 'border-border-subtle focus:border-mauve' : 'border-red-500 focus:border-red-500'
                }`}
              />
              <button
                onClick={handleHexSet}
                disabled={!isValidHex}
                className="px-3 py-1 bg-bg-elevated hover:bg-bg-elevated-2 border border-border-subtle rounded text-xs text-mauve disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                SET
              </button>
              <button
                onClick={handleReset}
                className="p-1 hover:text-mauve text-muted transition-colors"
                title="Reset to default"
              >
                <RefreshCw size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
