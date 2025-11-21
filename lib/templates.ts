import { ModernTemplate } from "@/components/resumes/ModernTemplate";
import { ResumeData } from "@/types/resume";
import { ComponentType } from "react";

export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  category: "Professional" | "Creative" | "Simple" | "Technical";
  component: ComponentType<{ data: ResumeData }>;
  thumbnail?: string; // Optional static image if we don't want live preview
}

export const templates: TemplateConfig[] = [
  {
    id: "modern",
    name: "Modern Professional",
    description: "A clean, structured design perfect for corporate roles.",
    category: "Professional",
    component: ModernTemplate,
  },
  // We can add more templates here later
];

export function getTemplateById(id: string) {
  return templates.find((t) => t.id === id);
}
