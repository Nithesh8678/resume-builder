import { ResumeData } from "@/types/resume"
import Image from "next/image"

export const CreativeTemplate = ({ data }: { data: ResumeData }) => {
  return (
    <div className="w-full h-full bg-white flex">
      {/* Sidebar */}
      <aside className="w-1/3 bg-slate-900 text-white p-8 flex flex-col gap-8">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto bg-slate-800 rounded-full mb-4 flex items-center justify-center text-4xl font-bold text-slate-600 overflow-hidden relative border-4 border-slate-700">
            {data.personalInfo.photoUrl ? (
              <Image 
                src={data.personalInfo.photoUrl} 
                alt={data.personalInfo.fullName} 
                fill 
                className="object-cover"
              />
            ) : (
              data.personalInfo.fullName.charAt(0)
            )}
          </div>
          <h1 className="text-2xl font-bold leading-tight mb-2">
            {data.personalInfo.fullName}
          </h1>
          <p className="text-slate-400 text-sm uppercase tracking-widest">
            {data.experience[0]?.position || "Professional"}
          </p>
        </div>

        {/* Contact */}
        <div className="space-y-3 text-sm text-slate-300">
          {data.personalInfo.email && (
            <div className="break-words">
              <span className="block text-xs text-slate-500 uppercase mb-1">Email</span>
              {data.personalInfo.email}
            </div>
          )}
          {data.personalInfo.phone && (
            <div>
              <span className="block text-xs text-slate-500 uppercase mb-1">Phone</span>
              {data.personalInfo.phone}
            </div>
          )}
          {data.personalInfo.location && (
            <div>
              <span className="block text-xs text-slate-500 uppercase mb-1">Location</span>
              {data.personalInfo.location}
            </div>
          )}
          {data.personalInfo.website && (
            <div className="break-words">
              <span className="block text-xs text-slate-500 uppercase mb-1">Portfolio</span>
              {data.personalInfo.website}
            </div>
          )}
        </div>

        {/* Skills */}
        {data.skills.length > 0 && (
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4 border-b border-slate-800 pb-2">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="bg-slate-800 text-slate-300 px-3 py-1 rounded text-xs"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="w-2/3 p-8 text-slate-800">
        {/* Summary */}
        {data.personalInfo.summary && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-3">
              <span className="w-8 h-1 bg-blue-500"></span>
              Profile
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {data.personalInfo.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-3">
              <span className="w-8 h-1 bg-purple-500"></span>
              Experience
            </h2>
            <div className="space-y-8 border-l-2 border-slate-100 pl-6 ml-2">
              {data.experience.map((exp, index) => (
                <div key={index} className="relative">
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-slate-200"></div>
                  <h3 className="font-bold text-lg text-slate-900">{exp.position}</h3>
                  <div className="text-blue-600 font-medium text-sm mb-2">
                    {exp.company}
                  </div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider mb-3">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate} | {exp.location}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-3">
              <span className="w-8 h-1 bg-pink-500"></span>
              Education
            </h2>
            <div className="grid gap-6">
              {data.education.map((edu, index) => (
                <div key={index} className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                  <h3 className="font-bold text-slate-900">{edu.school}</h3>
                  <div className="text-sm text-slate-600 mt-1">
                    {edu.degree} in {edu.field}
                  </div>
                  <div className="text-xs text-slate-400 mt-2 uppercase">
                    {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
