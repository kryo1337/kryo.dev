'use client';

import Link from 'next/link';
import Image from 'next/image';
import { personalProjects, wipProjects } from '@/lib/data';
import Scene from '@/components/3d/Scene';
import { Coffee, X, Github } from 'lucide-react';
import { useAssetLoader } from '@/hooks/useAssetLoader';
import LoadingScreen from '@/components/ui/LoadingScreen';
import ColorPicker from '@/components/ui/ColorPicker';
import { useMemo, useState, useCallback } from 'react';

export default function HomeContent() {
  const [sceneReady, setSceneReady] = useState(false);
  const [skullColor, setSkullColor] = useState('#E0B0FF');

  const images = useMemo(() => {
    return [
      '/images/background.jpg',
      ...personalProjects.map((p) => p.image),
      ...wipProjects.map((p) => p.image),
    ];
  }, []);

  const { progress, loaded } = useAssetLoader(images, sceneReady);

  const handleSceneReady = useCallback(() => {
    setSceneReady(true);
  }, []);

  const handleColorChange = useCallback((hex: string) => {
    setSkullColor(hex);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-mauve-dim/30 relative font-space">
      <LoadingScreen progress={progress} loaded={loaded} />

      <div className="absolute top-6 left-6 z-50">
        <ColorPicker onColorChange={handleColorChange} />
      </div>

      <div className="absolute top-6 right-6 flex gap-4 z-50">
        <a
          href="https://buymeacoffee.com/kryo"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted hover:text-mauve transition-transform hover:scale-110 duration-200"
          aria-label="Buy Me a Coffee"
        >
          <Coffee size={24} />
        </a>
        <a
          href="https://x.com/kryoxd"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted hover:text-mauve transition-transform hover:scale-110 duration-200"
          aria-label="Twitter"
        >
          <X size={24} />
        </a>
        <a
          href="https://github.com/kryo1337"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted hover:text-mauve transition-transform hover:scale-110 duration-200"
          aria-label="GitHub"
        >
          <Github size={24} />
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
              <Scene onReady={handleSceneReady} skullColor={skullColor} />
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
