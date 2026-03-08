export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  url?: string;
  repoUrl?: string;
  imageUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "landing-page",
    title: "Landing Page",
    description:
      "A responsive landing page built with HTML, CSS, and JavaScript. Features a clean hero section, smooth scroll navigation, and mobile-friendly layout.",
    tags: ["HTML", "CSS", "JavaScript"],
    repoUrl: "https://github.com/mrglasswillbreak/skills-introduction-to-github",
    featured: true,
  },
];
