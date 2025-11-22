import { ResumeData } from "@/types/resume"

export const TechnicalTemplate = ({ data }: { data: ResumeData }) => {
  return (
    <div className="w-full h-full bg-white text-slate-900 p-6 font-sans text-sm">
      {/* Header */}
      <header className="border-b border-slate-300 pb-4 mb-4">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-1">
              {data.personalInfo.fullName}
            </h1>
            <div className="text-slate-600 flex gap-3 text-xs">
              {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
              {data.personalInfo.phone && <span>| {data.personalInfo.phone}</span>}
              {data.personalInfo.location && <span>| {data.personalInfo.location}</span>}
              {data.personalInfo.github && <span>| {data.personalInfo.github}</span>}
              {data.personalInfo.linkedin && <span>| {data.personalInfo.linkedin}</span>}
            </div>
          </div>
        </div>
      </header>

      {/* Skills - Top Priority for Technical */}
      {data.skills.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase border-b border-slate-300 mb-2 pb-0.5">
            Technical Skills
          </h2>
          <div className="flex flex-wrap gap-1">
            {data.skills.map((skill, index) => (
              <span key={index} className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase border-b border-slate-300 mb-3 pb-0.5">
            Experience
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between font-bold text-slate-900">
                  <span>{exp.position}</span>
                  <span className="text-xs font-normal text-slate-600">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-700">{exp.company}</span>
                  <span className="text-slate-500">{exp.location}</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects (If any, mimicking experience structure for now or using summary if needed) */}
      {/* In a real technical resume, Projects are key. We'll assume they are part of experience or added later. */}

      {/* Education */}
      {data.education.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase border-b border-slate-300 mb-3 pb-0.5">
            Education
          </h2>
          <div className="space-y-2">
            {data.education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between font-bold text-slate-900">
                  <span>{edu.school}</span>
                  <span className="text-xs font-normal text-slate-600">
                    {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                  </span>
                </div>
                <div className="text-xs text-slate-700">
                  {edu.degree} in {edu.field}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
