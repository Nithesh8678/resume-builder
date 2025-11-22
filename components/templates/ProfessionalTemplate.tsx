import { ResumeData } from "@/types/resume"
import Image from "next/image"

export const ProfessionalTemplate = ({ data }: { data: ResumeData }) => {
  return (
    <div className="w-full h-full bg-white text-slate-900 p-8 font-serif">
      {/* Header */}
      <header className="border-b-2 border-slate-900 pb-6 mb-6 flex justify-between items-start gap-6">
        <div className="flex-1">
          <h1 className="text-4xl font-bold uppercase tracking-wide text-slate-900 mb-2">
            {data.personalInfo.fullName}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-slate-600 font-sans">
            {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
            {data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}
            {data.personalInfo.location && <span>• {data.personalInfo.location}</span>}
            {data.personalInfo.linkedin && <span>• {data.personalInfo.linkedin}</span>}
          </div>
        </div>
        {data.personalInfo.photoUrl && (
          <div className="w-24 h-24 relative overflow-hidden rounded-md border border-slate-200 flex-shrink-0">
            <Image 
              src={data.personalInfo.photoUrl} 
              alt={data.personalInfo.fullName} 
              fill 
              className="object-cover"
            />
          </div>
        )}
      </header>

      {/* Summary */}
      {data.personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b border-slate-300 mb-3 pb-1">
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 font-sans">
            {data.personalInfo.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b border-slate-300 mb-4 pb-1">
            Work Experience
          </h2>
          <div className="space-y-4 font-sans">
            {data.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-slate-900">{exp.position}</h3>
                  <span className="text-sm text-slate-500 whitespace-nowrap">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <div className="text-sm font-medium text-slate-700 mb-2">
                  {exp.company} • {exp.location}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b border-slate-300 mb-4 pb-1">
            Education
          </h2>
          <div className="space-y-3 font-sans">
            {data.education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-slate-900">{edu.school}</h3>
                  <span className="text-sm text-slate-500">
                    {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                  </span>
                </div>
                <div className="text-sm text-slate-700">
                  {edu.degree} in {edu.field}
                </div>
                {edu.description && (
                  <p className="text-sm text-slate-600 mt-1">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <section>
          <h2 className="text-lg font-bold uppercase border-b border-slate-300 mb-3 pb-1">
            Skills
          </h2>
          <div className="flex flex-wrap gap-x-6 gap-y-2 font-sans text-sm text-slate-700">
            {data.skills.map((skill, index) => (
              <span key={index} className="flex items-center">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-2"></span>
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
