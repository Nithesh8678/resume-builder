export interface SocialLink {
  platform: string;
  url: string;
}

export interface Education {
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  current: boolean;
  location: string;
  description?: string;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  location: string;
  description: string; // HTML or markdown content
}

export interface Skill {
  name: string;
  level?: number; // 1-5 or similar
}

export interface Project {
  name: string;
  description: string;
  url?: string;
  technologies?: string[];
}

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    website?: string;
    linkedin?: string;
    github?: string;
    summary: string;
    jobTitle: string;
  };
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  projects: Project[];
}
