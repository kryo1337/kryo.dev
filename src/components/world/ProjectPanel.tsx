'use client';

import { Project } from '@/lib/data';
import ProjectCard from '@/components/ProjectCard';

export default function ProjectPanel({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <ProjectCard
        project={project}
        className="w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
        titleClassName="font-minecraft text-lg text-mauve leading-relaxed"
      >
        <div className="flex gap-3 pt-1">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="font-minecraft px-5 py-2 text-xs text-white bg-mauve-dark hover:bg-mauve border-2 border-black shadow-[inset_-2px_-4px_0_rgba(0,0,0,0.4),inset_2px_2px_0_rgba(255,255,255,0.35)] [text-shadow:2px_2px_0_rgba(0,0,0,0.5)]"
          >
            Visit
          </a>
          <button
            onClick={onClose}
            className="font-minecraft px-5 py-2 text-xs text-white bg-[#727272] hover:bg-[#8a8a9e] border-2 border-black shadow-[inset_-2px_-4px_0_rgba(0,0,0,0.4),inset_2px_2px_0_rgba(255,255,255,0.35)] [text-shadow:2px_2px_0_rgba(0,0,0,0.5)] cursor-pointer"
          >
            Close
          </button>
        </div>
      </ProjectCard>
    </div>
  );
}
