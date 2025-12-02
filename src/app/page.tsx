import Link from 'next/link';
import Image from 'next/image';
import { personalProjects, wipProjects } from '@/lib/data';
import Scene from '@/components/3d/Scene';
import { Coffee, X, Github } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-purple-500/30 relative font-['JetBrains_Mono_Nerd','JetBrains_Mono',monospace]">
      <div className="absolute top-6 right-6 flex gap-4 z-50">
        <a
          href="https://buymeacoffee.com/kryo"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-400 hover:text-white transition-all hover:scale-110 duration-200"
          aria-label="Buy Me a Coffee"
        >
          <Coffee size={24} />
        </a>
        <a
          href="https://x.com/kryoxd"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-400 hover:text-white transition-all hover:scale-110 duration-200"
          aria-label="Twitter"
        >
          <X size={24} />
        </a>
        <a
          href="https://github.com/kryo1337"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-400 hover:text-white transition-all hover:scale-110 duration-200"
          aria-label="GitHub"
        >
          <Github size={24} />
        </a>
      </div>

      <section className="w-full p-4 md:p-6">
        <div className="relative h-[85vh] min-h-[600px] w-full md:w-[75%] mx-auto rounded-[2.5rem] overflow-hidden flex flex-col items-center justify-center bg-neutral-900 ring-1 ring-white/5 shadow-2xl">

          <div className="absolute inset-0 z-0">
            <Image
              src="/images/background.jpg"
              alt="Background"
              fill
              className="object-cover"
              priority
              quality={90}
              fetchPriority="high"
              loading="eager"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-20" />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          <div className="absolute inset-0 z-10 flex items-start justify-center pointer-events-none pt-8">
            <div className="w-full h-[300px] pointer-events-auto relative" style={{ zIndex: 10 }}>
              <Scene />
            </div>
          </div>

          <div className="relative z-20 text-center space-y-6 px-4 mt-60">
            <div className="inline-block">
              <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white pb-2 drop-shadow-lg font-minecraft">
                kryo
              </h1>
            </div>

            <div className="pt-8 pointer-events-auto">
              <Link
                href="#projects"
                className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md transition-all duration-300 text-xs font-medium tracking-wider uppercase"
              >
                View Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-24" id="projects">

        <div className="mb-24">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white">Personal Projects</h2>
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${personalProjects.length >= 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'}`}>
            {personalProjects.map((project, idx) => (
              <a
                key={idx}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col h-full p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-purple-500/50 hover:bg-neutral-900 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300"
              >
                <div className="relative w-full aspect-[570/438] mb-6 overflow-hidden rounded-lg bg-neutral-800">
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
                    <h3 className="text-xl font-semibold group-hover:text-purple-400 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-sm text-neutral-400 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-neutral-800 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700 group-hover:border-neutral-600 transition-colors font-consolas"
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
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white">Work In Progress</h2>
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${wipProjects.length >= 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'}`}>
            {wipProjects.map((project, idx) => (
              <a
                key={idx}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col h-full p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-purple-500/50 hover:bg-neutral-900 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300"
              >
                <div className="relative w-full aspect-[570/438] mb-6 overflow-hidden rounded-lg bg-neutral-800 opacity-80 group-hover:opacity-100 transition-opacity">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                  />
                </div>

                <div className="flex-1 space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold group-hover:text-purple-400 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-sm text-neutral-400 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-neutral-800 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700 group-hover:border-neutral-600 transition-colors font-consolas"
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

      <footer className="py-12 text-center text-neutral-600 text-xs">
        <p>&copy; 2025 kryo.dev</p>
      </footer>
    </main>
  );
}
