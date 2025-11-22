import { ModernTemplate } from "@/components/resumes/ModernTemplate";
import { ProfessionalTemplate } from "@/components/templates/ProfessionalTemplate";
import { CreativeTemplate } from "@/components/templates/CreativeTemplate";
import { SimpleTemplate } from "@/components/templates/SimpleTemplate";
import { TechnicalTemplate } from "@/components/templates/TechnicalTemplate";
import { ResumeData } from "@/types/resume";
import { ComponentType } from "react";

export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  category: "Professional" | "Creative" | "Simple" | "Technical";
  component: ComponentType<{ data: ResumeData }>;
  thumbnail?: string; // Optional static image if we don't want live preview
  hasPhoto?: boolean;
}

export const templates: TemplateConfig[] = [
  {
    id: "modern",
    name: "Modern Professional",
    description: "A clean, structured design perfect for corporate roles.",
    category: "Professional",
    component: ModernTemplate,
  },
  {
    id: "executive",
    name: "Executive",
    description: "Classic, authoritative design for leadership roles.",
    category: "Professional",
    component: ProfessionalTemplate,
    hasPhoto: true,
  },
  {
    id: "designer",
    name: "Creative Designer",
    description: "Bold layout with accent colors for creative professionals.",
    category: "Creative",
    component: CreativeTemplate,
    hasPhoto: true,
  },
  {
    id: "minimalist",
    name: "Clean Minimalist",
    description: "Pure, distraction-free design focusing on content.",
    category: "Simple",
    component: SimpleTemplate,
  },
  {
    id: "engineer",
    name: "Technical Engineer",
    description: "Dense, skills-focused layout for technical roles.",
    category: "Technical",
    component: TechnicalTemplate,
  },
];

export function getTemplateById(id: string) {
  return templates.find((t) => t.id === id);
}
