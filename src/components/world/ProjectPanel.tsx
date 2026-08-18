'use client';

import { Project } from '@/lib/data';
import ProjectCard from '@/components/ProjectCard';
import ProjectActions from '@/components/ProjectActions';

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
        <ProjectActions project={project} onClose={onClose} />
      </ProjectCard>
    </div>
  );
}
