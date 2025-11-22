import { ResumeData } from "@/types/resume"

export const SimpleTemplate = ({ data }: { data: ResumeData }) => {
  return (
    <div className="w-full h-full bg-white text-slate-900 p-12">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-3xl font-light tracking-tight text-slate-900 mb-4">
          {data.personalInfo.fullName}
        </h1>
        <div className="flex justify-center gap-4 text-xs text-slate-500 uppercase tracking-widest">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
        </div>
      </header>

      {/* Summary */}
      {data.personalInfo.summary && (
        <section className="mb-10 max-w-2xl mx-auto text-center">
          <p className="text-sm leading-loose text-slate-600">
            {data.personalInfo.summary}
          </p>
        </section>
      )}

      <div className="max-w-3xl mx-auto space-y-10">
        {/* Experience */}
        {data.experience.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 text-center">
              Experience
            </h2>
            <div className="space-y-8">
              {data.experience.map((exp, index) => (
                <div key={index} className="grid grid-cols-[1fr_3fr] gap-8">
                  <div className="text-right">
                    <div className="text-sm font-medium text-slate-900">{exp.company}</div>
                    <div className="text-xs text-slate-500 mt-1">
                      {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-2">{exp.position}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 text-center">
              Education
            </h2>
            <div className="space-y-6">
              {data.education.map((edu, index) => (
                <div key={index} className="grid grid-cols-[1fr_3fr] gap-8">
                  <div className="text-right">
                    <div className="text-sm font-medium text-slate-900">{edu.school}</div>
                    <div className="text-xs text-slate-500 mt-1">
                      {edu.startDate} — {edu.current ? "Present" : edu.endDate}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-900">
                      {edu.degree} in {edu.field}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 text-center">
              Skills
            </h2>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
              {data.skills.map((skill, index) => (
                <span key={index} className="text-sm text-slate-600">
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
