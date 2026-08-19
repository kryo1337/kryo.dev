"use client";

import Image from "next/image";
import ProjectCard from "@/components/ProjectCard";
import ProjectActions from "@/components/ProjectActions";
import { personalProjects } from "@/lib/data";
import ColorPicker from "@/components/ui/ColorPicker";

export default function HomeContent() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-mauve-dim/30 relative">
      <div className="fixed inset-x-0 top-0 z-50 flex items-start justify-between gap-3 px-4 py-3 md:px-6 md:py-4">
        <ColorPicker />
        <div className="flex flex-wrap justify-end gap-x-2 gap-y-1">
          <a
            href="https://x.com/kryoxd"
            target="_blank"
            rel="noopener noreferrer"
            className="link-tui"
          >
            [x]
          </a>
          <a
            href="https://github.com/kryo1337"
            target="_blank"
            rel="noopener noreferrer"
            className="link-tui"
          >
            [github]
          </a>
          <a
            href="https://www.youtube.com/channel/UCaamKqTrsqzxivu2GhFRGUg?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="link-tui"
          >
            [yt]
          </a>
          <a
            href="https://www.twitch.tv/kryoxd"
            target="_blank"
            rel="noopener noreferrer"
            className="link-tui"
          >
            [twitch]
          </a>
          <a
            href="https://buymeacoffee.com/kryo"
            target="_blank"
            rel="noopener noreferrer"
            className="link-tui"
          >
            [coffee]
          </a>
        </div>
      </div>

      <section className="w-full px-4 pt-20 pb-4 md:px-6 md:pt-20 md:pb-6">
        <div className="relative h-[85vh] min-h-[600px] w-full md:w-[72%] mx-auto rounded-none overflow-hidden flex flex-col items-center justify-center bg-bg-elevated-2 border border-border-subtle">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/background.jpg"
              alt="Background"
              fill
              className="object-cover opacity-60"
              priority
              quality={75}
              fetchPriority="high"
              loading="eager"
            />
            <div className="absolute inset-0 bg-background/40" />
            <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-20" />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-background to-transparent" />
          </div>

          <div className="relative z-20 text-center space-y-6 px-4">
            <div className="inline-block">
              <h1 className="text-5xl md:text-8xl tracking-tighter text-mauve pb-2 drop-shadow-none font-minecraft">
                kryo
              </h1>
            </div>

            <p className="font-minecraft text-[10px] md:text-xs text-white/70 leading-relaxed">
              software developer
            </p>

            <div className="pt-8 pointer-events-auto flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="cursor-pointer inline-flex items-center justify-center font-minecraft w-56 h-10 text-sm text-white bg-mauve-dark hover:bg-mauve border-2 border-black shadow-[inset_-2px_-4px_0_rgba(0,0,0,0.4),inset_2px_2px_0_rgba(255,255,255,0.35)] [text-shadow:2px_2px_0_rgba(0,0,0,0.5)] active:shadow-[inset_2px_4px_0_rgba(0,0,0,0.4)]"
              >
                View Projects
              </button>
              <a
                href="/world"
                className="hidden md:inline-flex items-center justify-center font-minecraft w-56 h-10 text-sm text-white bg-[#727272] hover:bg-[#8a8a9e] border-2 border-black shadow-[inset_-2px_-4px_0_rgba(0,0,0,0.4),inset_2px_2px_0_rgba(255,255,255,0.35)] [text-shadow:2px_2px_0_rgba(0,0,0,0.5)] active:shadow-[inset_2px_4px_0_rgba(0,0,0,0.4)]"
              >
                Enter World
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-24" id="projects">
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[30px] text-mauve">personal projects</h2>
            <a
              href="/world"
              className="hidden md:inline-block font-minecraft px-4 py-1.5 text-xs text-white bg-[#727272] hover:bg-[#8a8a9e] border-2 border-black shadow-[inset_-2px_-4px_0_rgba(0,0,0,0.4),inset_2px_2px_0_rgba(255,255,255,0.35)] [text-shadow:2px_2px_0_rgba(0,0,0,0.5)] active:shadow-[inset_2px_4px_0_rgba(0,0,0,0.4)]"
            >
              Enter World
            </a>
          </div>
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${personalProjects.length >= 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}
          >
            {personalProjects.map((project) => (
              <ProjectCard
                key={project.title}
                project={project}
                className="h-full flex flex-col"
              >
                <div className="mt-auto">
                  <ProjectActions project={project} />
                </div>
              </ProjectCard>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 text-center text-muted text-[20px]">
        <p>&copy; 2026 kryo.dev</p>
      </footer>
    </main>
  );
}
