import Link from 'next/link';
import Image from 'next/image';
import { personalProjects, wipProjects } from '@/lib/data';
import Scene from '@/components/3d/Scene';

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-purple-500/30">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Background Layers */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/background.png" 
            alt="Background" 
            fill 
            className="object-cover"
            priority
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40" />
          {/* Noise Texture */}
          <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-20" />
          {/* Bottom Fade */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-neutral-950 to-transparent" />
        </div>

        {/* 3D Scene Container */}
        <div className="relative z-10 w-full h-[300px] mb-4 animate-in fade-in duration-1000 flex items-center justify-center">
          <Scene />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-20 text-center space-y-6 px-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          <div className="inline-block">
            <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-white pb-2 drop-shadow-lg">
              KRYO.DEV
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-neutral-200 font-light tracking-wide max-w-2xl mx-auto drop-shadow-md">
            dev
          </p>
          
          <div className="pt-8 pointer-events-auto">
            <Link 
              href="#projects" 
              className="px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md transition-all duration-300 text-sm font-medium tracking-wider uppercase"
            >
              View Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="container mx-auto px-4 py-24" id="projects">
        
        {/* Personal Projects */}
        <div className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">Personal Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {personalProjects.map((project, idx) => (
              <a
                key={idx}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col h-full p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-purple-500/50 hover:bg-neutral-900 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300"
              >
                <div className="relative w-full h-48 mb-6 overflow-hidden rounded-lg bg-neutral-800">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-semibold group-hover:text-purple-400 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-neutral-400 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>
                
                <div className="mt-6 pt-6 border-t border-neutral-800 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700 group-hover:border-neutral-600 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* WIP Projects */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">Work In Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wipProjects.map((project, idx) => (
              <a
                key={idx}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col h-full p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-purple-500/50 hover:bg-neutral-900 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300"
              >
                <div className="relative w-full h-48 mb-6 overflow-hidden rounded-lg bg-neutral-800 opacity-80 group-hover:opacity-100 transition-opacity">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0" 
                  />
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-semibold group-hover:text-purple-400 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-neutral-400 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>
                
                <div className="mt-6 pt-6 border-t border-neutral-800 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700 group-hover:border-neutral-600 transition-colors"
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
      
      <footer className="py-12 text-center text-neutral-600 text-sm">
        <p>c 2025 kryo.dev</p>
      </footer>
    </main>
  );
}