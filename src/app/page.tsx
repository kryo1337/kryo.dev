import Link from 'next/link';
import { projects } from '@/lib/data';
import Scene from '@/components/3d/Scene';

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-purple-500/30">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        {/* Background Scene */}
        <div className="absolute inset-0 z-0 opacity-60">
          <Scene />
        </div>

        {/* Hero Content */}
        <div className="z-10 relative text-center space-y-6 px-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="inline-block">
            <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-white pb-2">
              KRYO.DEV
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-neutral-400 font-light tracking-wide max-w-2xl mx-auto">
            dev
          </p>

          <div className="pt-8">
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
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Personal Work</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group flex flex-col h-full p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-purple-500/50 hover:bg-neutral-900 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300"
            >
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
            </Link>
          ))}
        </div>
      </section>

      <footer className="py-12 text-center text-neutral-600 text-sm">
        <p>© 2025 kryo.dev</p>
      </footer>
    </main>
  );
}
