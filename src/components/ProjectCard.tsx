import Image from 'next/image';
import { KeyboardEvent, MouseEventHandler, ReactNode } from 'react';
import { Project } from '@/lib/data';

export default function ProjectCard({
  project,
  titleClassName = 'text-[30px] leading-none text-mauve',
  className = '',
  onClick,
  onImageClick,
  children,
}: {
  project: Project;
  titleClassName?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  onImageClick?: () => void;
  children?: ReactNode;
}) {
  const handleImageKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.code === 'Enter' || e.code === 'Space') {
      e.preventDefault();
      onImageClick?.();
    }
  };

  return (
    <div
      onClick={onClick}
      className={`bg-[#2a2933] border-4 border-black shadow-[inset_2px_2px_0_rgba(255,255,255,0.15),inset_-2px_-2px_0_rgba(0,0,0,0.5)] p-6 space-y-5 ${className}`}
    >
      <div
        onClick={onImageClick && ((e) => { e.stopPropagation(); onImageClick(); })}
        onKeyDown={onImageClick && handleImageKeyDown}
        role={onImageClick ? 'button' : undefined}
        tabIndex={onImageClick ? 0 : undefined}
        aria-label={onImageClick ? `zoom ${project.title}` : undefined}
        className={`relative w-full aspect-[16/9] overflow-hidden border-2 border-black bg-black ${
          onImageClick ? 'cursor-zoom-in transition hover:brightness-110' : ''
        }`}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain"
        />
      </div>

      <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
        <h3 className={titleClassName}>{project.title}</h3>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.isPrivate && (
            <span className="px-2 py-0.5 text-[20px] leading-tight bg-[#9d7cff]/10 text-[#9d7cff] border border-[#9d7cff]/20">
              private
            </span>
          )}
          {project.wip && (
            <span className="px-2 py-0.5 text-[20px] leading-tight bg-amber-500/10 text-amber-400 border border-amber-500/20">
              in progress
            </span>
          )}
          <span
            className={`px-2 py-0.5 text-[20px] leading-tight ${
              project.isOpenSource
                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                : 'bg-red-500/10 text-red-400 border border-red-500/20'
            }`}
          >
            {project.isOpenSource ? 'open source' : 'closed source'}
          </span>
        </div>
      </div>

      <p className="text-[20px] text-foreground/90 leading-snug">{project.description}</p>

      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="px-2 py-0.5 text-[20px] leading-tight bg-bg-elevated text-muted border border-border-subtle">
            {tag}
          </span>
        ))}
      </div>

      {children}
    </div>
  );
}
