import { Project } from '@/lib/data';

const btn =
  'font-minecraft px-5 py-2 text-xs text-white border-2 border-black shadow-[inset_-2px_-4px_0_rgba(0,0,0,0.4),inset_2px_2px_0_rgba(255,255,255,0.35)] [text-shadow:2px_2px_0_rgba(0,0,0,0.5)]';

export default function ProjectActions({ project, onClose }: { project: Project; onClose?: () => void }) {
  return (
    <div className="flex gap-3 pt-1">
      {project.link ? (
        <a href={project.link} target="_blank" rel="noopener noreferrer" className={`${btn} bg-mauve-dark hover:bg-mauve`}>
          Visit
        </a>
      ) : (
        <span
          aria-disabled="true"
          className="font-minecraft px-5 py-2 text-xs text-[#a0a0a0] bg-[#4c4c4c] border-2 border-black shadow-[inset_-2px_-4px_0_rgba(0,0,0,0.3),inset_2px_2px_0_rgba(255,255,255,0.12)] [text-shadow:2px_2px_0_rgba(0,0,0,0.5)] cursor-not-allowed select-none"
        >
          Visit
        </span>
      )}
      {onClose && (
        <button onClick={onClose} className={`${btn} bg-[#727272] hover:bg-[#8a8a9e] cursor-pointer`}>
          Close
        </button>
      )}
      {project.repo && (
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className={`${btn} ml-auto bg-[#24292f] hover:bg-[#3a4049]`}
        >
          GitHub
        </a>
      )}
    </div>
  );
}
