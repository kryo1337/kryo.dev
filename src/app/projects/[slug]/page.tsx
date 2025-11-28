import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProjectBySlug, projects } from '@/lib/data';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-purple-500/30">
      {/* Header / Navigation */}
      <header className="border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link 
            href="/"
            className="group flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="group-hover:-translate-x-1 transition-transform"
            >
              <path d="m15 18-6-6 6-6"/>
            </svg>
            <span className="font-medium">Back to Home</span>
          </Link>
          
          <div className="text-sm font-medium text-neutral-500 hidden sm:block">
            {project.title}
          </div>
        </div>
      </header>

      {/* Content */}
      <article className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          {/* Project Header */}
          <div className="space-y-6 border-b border-neutral-800 pb-12">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
                {project.title}
              </h1>
              <p className="text-xl md:text-2xl text-neutral-400 font-light leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 text-sm font-medium rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="prose prose-invert prose-lg max-w-none prose-headings:font-semibold prose-p:text-neutral-300 prose-a:text-purple-400 hover:prose-a:text-purple-300">
            <p className="whitespace-pre-wrap leading-8">
              {project.content}
            </p>
            {/* Placeholder for more content */}
            <div className="mt-12 p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800 border-dashed flex items-center justify-center text-neutral-500">
              <p>Additional project screenshots or demo video would go here.</p>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}