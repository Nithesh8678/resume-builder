import { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from "lucide-react";

interface TemplateProps {
  data: ResumeData;
}

export function ModernTemplate({ data }: TemplateProps) {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="w-full bg-white text-slate-800 p-8 min-h-[1000px] shadow-sm">
      {/* Header */}
      <header className="border-b-2 border-slate-800 pb-6 mb-6">
        <h1 className="text-4xl font-bold text-slate-900 uppercase tracking-tight">{personalInfo.fullName}</h1>
        <p className="text-xl text-blue-600 font-medium mt-1">{personalInfo.jobTitle}</p>
        
        <div className="flex flex-wrap gap-4 mt-4 text-sm text-slate-600">
          {personalInfo.email && (
            <div className="flex items-center gap-1.5">
              <Mail className="w-4 h-4" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1.5">
              <Phone className="w-4 h-4" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-1.5">
              <Linkedin className="w-4 h-4" />
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
          {personalInfo.github && (
            <div className="flex items-center gap-1.5">
              <Github className="w-4 h-4" />
              <span>{personalInfo.github}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-1.5">
              <Globe className="w-4 h-4" />
              <span>{personalInfo.website}</span>
            </div>
          )}
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8">
        {/* Main Column */}
        <div className="col-span-8 space-y-8">
          {/* Summary */}
          {personalInfo.summary && (
            <section>
              <h2 className="text-lg font-bold text-slate-900 uppercase border-b border-slate-200 pb-2 mb-3">Professional Summary</h2>
              <p className="text-slate-700 leading-relaxed">{personalInfo.summary}</p>
            </section>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-slate-900 uppercase border-b border-slate-200 pb-2 mb-4">Experience</h2>
              <div className="space-y-6">
                {experience.map((job, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-slate-900">{job.position}</h3>
                      <span className="text-sm text-slate-500 font-medium">
                        {job.startDate} - {job.current ? "Present" : job.endDate}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-blue-600 font-medium">{job.company}</span>
                      <span className="text-xs text-slate-400">{job.location}</span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{job.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-slate-900 uppercase border-b border-slate-200 pb-2 mb-4">Projects</h2>
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-slate-900">{project.name}</h3>
                      {project.url && <span className="text-xs text-blue-500">{project.url}</span>}
                    </div>
                    <p className="text-sm text-slate-700 mt-1">{project.description}</p>
                    {project.technologies && (
                      <div className="flex gap-2 mt-2">
                        {project.technologies.map((tech, i) => (
                          <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar Column */}
        <div className="col-span-4 space-y-8">
          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-slate-900 uppercase border-b border-slate-200 pb-2 mb-4">Education</h2>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="font-bold text-slate-900">{edu.school}</h3>
                    <p className="text-sm text-slate-700">{edu.degree} in {edu.field}</p>
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>{edu.startDate} - {edu.endDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-slate-900 uppercase border-b border-slate-200 pb-2 mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span key={index} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium">
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
