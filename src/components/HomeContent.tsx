'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { personalProjects, wipProjects } from '@/lib/data';
import Scene from '@/components/3d/Scene';
import ColorPicker from '@/components/ui/ColorPicker';

const DEFAULT_COLOR = '#C80050';
const STORAGE_KEY = 'kryo-accent-color';

function getInitialColor() {
  if (typeof window === 'undefined') return DEFAULT_COLOR;
  const saved = localStorage.getItem(STORAGE_KEY);
  return (saved && /^#[0-9A-F]{6}$/i.test(saved)) ? saved : DEFAULT_COLOR;
}

export default function HomeContent() {
  const [skullColor, setSkullColor] = useState(() => getInitialColor());

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-mauve-dim/30 relative font-space">
      <div className="fixed top-4 left-4 md:top-6 md:left-6 z-50">
        <ColorPicker onColorChange={(hex) => setSkullColor(hex)} />
      </div>

      <div className="fixed top-4 right-4 md:top-6 md:right-6 flex gap-3 md:gap-4 z-50">
        <a
          href="https://buymeacoffee.com/kryo"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted hover:text-mauve transition-transform hover:scale-110 duration-200"
          aria-label="Buy Me a Coffee"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            className="w-5 h-5 md:w-6 md:h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
            <line x1="6" y1="1" x2="6" y2="4" />
            <line x1="10" y1="1" x2="10" y2="4" />
            <line x1="14" y1="1" x2="14" y2="4" />
          </svg>
        </a>
        <a
          href="https://x.com/kryoxd"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted hover:text-mauve transition-transform hover:scale-110 duration-200"
          aria-label="X (Twitter)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            className="w-5 h-5 md:w-6 md:h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 4l11.733 16h4.267l-11.733 -16z M20 4l-11.733 16h-4.267l11.733 -16z" />
          </svg>
        </a>
        <a
          href="https://github.com/kryo1337"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted hover:text-mauve transition-transform hover:scale-110 duration-200"
          aria-label="GitHub"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            className="w-5 h-5 md:w-6 md:h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
          </svg>
        </a>
      </div>

      <section className="w-full p-4 md:p-6">
        <div className="relative h-[85vh] min-h-[600px] w-full md:w-[75%] mx-auto rounded-[2.5rem] overflow-hidden flex flex-col items-center justify-center bg-bg-elevated-2 ring-1 ring-border-subtle shadow-none">

          <div className="absolute inset-0 z-0">
            <Image
              src="/images/background.jpg"
              alt="Background"
              fill
              className="object-cover opacity-60"
              priority
              quality={90}
              fetchPriority="high"
              loading="eager"
            />
            <div className="absolute inset-0 bg-background/40" />
            <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-20" />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-background to-transparent" />
          </div>

          <div className="absolute inset-0 z-10 flex items-start justify-center pointer-events-none pt-8">
            <div className="w-full h-[300px] pointer-events-auto relative" style={{ zIndex: 10 }}>
              <Scene skullColor={skullColor} />
            </div>
          </div>

          <div className="relative z-20 text-center space-y-6 px-4 mt-60">
            <div className="inline-block">
              <h1 className="text-5xl md:text-8xl tracking-tighter text-mauve pb-2 drop-shadow-none font-minecraft">
                kryo
              </h1>
            </div>

            <div className="pt-8 pointer-events-auto">
              <Link
                href="#projects"
                className="px-6 py-2.5 rounded-full bg-mauve-dark hover:bg-mauve text-white text-xs font-medium tracking-wider uppercase border border-transparent"
              >
                View Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-24" id="projects">

        <div className="mb-24">
          <h2 className="text-xs font-semibold mb-8 text-mauve uppercase tracking-wide">Personal Projects</h2>
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${personalProjects.length >= 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'}`}>
            {personalProjects.map((project, idx) => (
              <a
                key={idx}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col h-full p-6 rounded-2xl bg-bg-elevated-2 border border-border-subtle hover:border-mauve-dim hover:shadow-lg hover:shadow-mauve-dark/10 transition-transform duration-300"
              >
                  <div className="relative w-full aspect-[2.5/1] mb-6 overflow-hidden rounded-lg bg-bg-elevated">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold text-mauve transition-colors">
                        {project.title}
                      </h3>
                      <span className={`px-2 py-1 text-[10px] font-medium rounded-full font-mono ${
                        project.isOpenSource 
                          ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                          : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {project.isOpenSource ? 'open source' : 'closed source'}
                      </span>
                    </div>
                    <p className="text-sm text-foreground line-clamp-3 leading-relaxed font-space">
                      {project.description}
                    </p>
                  </div>

                <div className="mt-6 pt-6 border-t border-border-subtle flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-[11px] font-medium rounded-full bg-bg-elevated text-muted border border-border-subtle font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xs font-semibold mb-8 text-mauve uppercase tracking-wide">Projects in Progress</h2>
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${wipProjects.length >= 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'}`}>
            {wipProjects.map((project, idx) => (
              <a
                key={idx}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col h-full p-6 rounded-2xl bg-bg-elevated-2 border border-border-subtle hover:border-mauve-dim hover:shadow-lg hover:shadow-mauve-dark/10 transition-transform duration-300"
              >
                  <div className="relative w-full aspect-[2.5/1] mb-6 overflow-hidden rounded-lg bg-bg-elevated opacity-80 group-hover:opacity-100 transition-opacity">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                    />
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold text-mauve transition-colors">
                        {project.title}
                      </h3>
                      <span className={`px-2 py-1 text-[10px] font-medium rounded-full font-mono ${
                        project.isOpenSource 
                          ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                          : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {project.isOpenSource ? 'open source' : 'closed source'}
                      </span>
                    </div>
                    <p className="text-sm text-foreground line-clamp-3 leading-relaxed font-space">
                      {project.description}
                    </p>
                  </div>

                <div className="mt-6 pt-6 border-t border-border-subtle flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-[11px] font-medium rounded-full bg-bg-elevated text-muted border border-border-subtle font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 text-center text-muted text-xs">
        <p>&copy; 2026 kryo.dev</p>
      </footer>
    </main>
  );
}
