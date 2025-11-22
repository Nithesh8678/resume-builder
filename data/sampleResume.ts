import { ResumeData } from "@/types/resume";

export const sampleResume: ResumeData = {
  personalInfo: {
    fullName: "Alex Morgan",
    jobTitle: "Senior Software Engineer",
    email: "alex.morgan@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/alexmorgan",
    github: "github.com/alexmorgan",
    summary: "Experienced software engineer with a passion for building scalable web applications. Proven track record of delivering high-quality code and leading engineering teams. Expert in React, Node.js, and cloud architecture.",
  },
  experience: [
    {
      company: "TechFlow Solutions",
      position: "Senior Frontend Developer",
      location: "San Francisco, CA",
      startDate: "2021-03",
      endDate: "Present",
      current: true,
      description: "Leading the frontend migration to Next.js. Improved site performance by 40%. Mentoring junior developers and establishing code quality standards.",
    },
    {
      company: "Creative Digital Agency",
      position: "Full Stack Developer",
      location: "Austin, TX",
      startDate: "2018-06",
      endDate: "2021-02",
      current: false,
      description: "Developed custom e-commerce solutions for high-profile clients. Integrated payment gateways and headless CMS platforms.",
    },
  ],
  education: [
    {
      school: "University of Technology",
      degree: "B.S.",
      field: "Computer Science",
      location: "Austin, TX",
      startDate: "2014-09",
      endDate: "2018-05",
      current: false,
    },
  ],
  skills: [
    { name: "React / Next.js" },
    { name: "TypeScript" },
    { name: "Node.js" },
    { name: "Tailwind CSS" },
    { name: "PostgreSQL" },
    { name: "AWS" },
  ],
  projects: [
    {
      name: "E-Commerce Dashboard",
      description: "A comprehensive analytics dashboard for online retailers.",
      technologies: ["React", "D3.js", "Firebase"],
    },
    {
      name: "Task Master App",
      description: "Productivity application with real-time collaboration features.",
      technologies: ["Vue.js", "Socket.io", "Express"],
    },
  ],
};
