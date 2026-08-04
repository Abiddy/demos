'use client';

import { useInViewAnimation } from './useInViewAnimation';

const PROJECTS = [
  {
    name: 'evr',
    description: 'From idea to millions raised for a web3 AI product',
    image:
      'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  },
  {
    name: 'Automation Machines',
    description: 'Streamlining industrial automation processes',
    image:
      'https://motionsites.ai/assets/hero-automation-machines-preview-DlTveRIN.gif',
  },
  {
    name: 'xPortfolio',
    description: 'Modern portfolio management platform',
    image:
      'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  },
] as const;

function ProjectItem({
  name,
  description,
  image,
}: (typeof PROJECTS)[number]) {
  const { ref, animClass } = useInViewAnimation();

  return (
    <article ref={ref} className={animClass}>
      <div className="ml-20 md:ml-28">
        <h3 className="font-mondwest text-2xl font-semibold text-[#051A24] md:text-3xl">
          {name}
        </h3>
        <p className="mt-2 text-sm text-[#051A24]/70 md:text-base">
          {description}
        </p>
      </div>
      <img
        src={image}
        alt={name}
        className="mt-6 w-full rounded-2xl object-cover shadow-lg"
      />
    </article>
  );
}

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="mx-auto max-w-[1200px] space-y-16 px-6 py-12 md:space-y-20"
    >
      {PROJECTS.map((project) => (
        <ProjectItem key={project.name} {...project} />
      ))}
    </section>
  );
}
