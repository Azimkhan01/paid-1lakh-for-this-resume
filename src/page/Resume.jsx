

import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import  html2pdf  from "html2pdf.js";

function Resume({isLink}) {
  const [hardCopy,setHardCopy] = useState(false)
  const mainId = useRef()
  // console.log(mainId.current)
  // ✅ Declare print handler using useReactToPrint hook
  const handlePrint = ()=>{
   if (!mainId.current) return;

  setTimeout(() => {
    const opt = {
      margin: 0.3,
      filename: "My_Resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(opt).from(mainId.current).save();
  }, 100); // delay 
  }
  const {
    headerOne,
    social,
    summary,
    workExperience,
    skill,
    project,
    course,
    education,
    certification,
    otherInfomation,
  } = useSelector((state) => state.FormSlice);
  // console.log(social)
  return (
    <>
      <Link
        to="/"
        className={`absolute top-10 left-10 border border-black/40 p-2 rounded ${isLink && 'hidden'} `}
      >
        <FaRegEdit />
      </Link>
      <button className="border text-blue-400 border-blue-400 m-2 hover:bg-blue-400 hover:text-white/90 transition-all ease-in-out duration-200 rounded p-2" onClick={()=>setHardCopy(!hardCopy)} >HardCopy</button>
      <button className="border text-blue-400 border-blue-400 m-2 hover:bg-blue-400 hover:text-white/90 transition-all ease-in-out duration-200 rounded p-2" 
      onClick={handlePrint} 
      >Print</button>
      <div ref={mainId} className="max-w-4xl mx-auto p-12 text-gray-900 font-sans space-y-6 bg-white">
        {/* Header */}
        <header className="text-center space-y-1">
          <h1 className="text-3xl font-bold">{headerOne?.name}</h1>
          <p>
            +91 {headerOne?.number} |{" "}
            <a
              href={`mailto:${headerOne?.email}`}
              className="text-blue-600 underline decoration-white"
            >
              {headerOne?.email}
            </a>{" "}
            | {headerOne?.address}
          </p>
          { social && !hardCopy && (
            <p>
              {social.linkedin && <a href={social.linkedin} className="decoration-white text-blue-400" target="_blank">LinkedIn |</a>}
              {social.github && <><a href={social.github} className="decoration-white text-blue-400" target="_blank"> GitHub |</a> </>}
              {social.portfolio && <><a href={social.portfolio} className="decoration-white text-blue-400" target="_blank">Portfolio</a> </>}
            </p>
          )}
        </header>

        {/* Summary */}
        {summary && (
          <section>
            <h2 className="text-xl font-bold border-b border-gray-300 pb-1 mb-2">SUMMARY</h2>
            <p>{summary}</p>
          </section>
        )}

        {/* Work Experience */}
        {workExperience?.length > 0 && (
          <section>
            <h2 className="text-xl font-bold border-b border-gray-300 pb-1 mb-2">WORK EXPERIENCE</h2>
            {workExperience.map((job, idx) => (
              <div key={idx} className="mb-4">
                <h3 className="font-semibold">{job.company_name}</h3>
                <p className="italic">
                  {job.role} — {job.start} – {job.end}
                </p>
                <ul className="list-disc list-inside">
                  {job.points?.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {skill?.length > 0 && (
          <section>
            <h2 className="text-xl font-bold border-b border-gray-300 pb-1 mb-2">SKILLS</h2>
            <ul className="list-disc list-inside">
              {skill.map((s, i) => (
                <li key={i}>
                  <strong>{s.name}:</strong> {s.skills.join(", ")}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Projects */}
        {project?.length > 0 && (
          <section>
            <h2 className="text-xl font-bold border-b border-gray-300 pb-1 mb-2">PROJECTS</h2>
            {project.map((proj, idx) => (
              <div key={idx} className="mb-4">
                <h3 className="font-semibold">{proj.title} | {proj.tech}</h3>
                <ul className="list-disc list-inside">
                  {proj.points?.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
                {proj.links && (
                  <div className="text-blue-600 underline space-x-4 mt-1">
                    {proj.links.linkedin && (
                      <a href={proj.links.linkedin} target="_blank" rel="noreferrer">
                        LinkedIn
                      </a>
                    )}
                    {proj.links.github && (
                      <a href={proj.links.github} target="_blank" rel="noreferrer">
                        GitHub
                      </a>
                    )}
                    {proj.links.portfolio && (
                      <a href={proj.links.portfolio} target="_blank" rel="noreferrer">
                        Portfolio
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Courses */}
        {course?.length > 0 && (
          <section>
            <h2 className="text-xl font-bold border-b border-gray-300 pb-1 mb-2">COURSES</h2>
            {course.map((c, i) => (
              <div key={i} className="mb-2">
                <p>
                  <strong>{c.name}</strong> — {c.startDate} – {c.endDate}
                </p>
                {c.coursework?.length > 0 && (
                  <ul className="list-disc list-inside ml-4">
                    {c.coursework.map((cw, j) => (
                      <li key={j}>{cw}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {education?.length > 0 && (
          <section>
            <h2 className="text-xl font-bold border-b border-gray-300 pb-1 mb-2">EDUCATION</h2>
            {education.map((e, i) => (
              <div key={i} className="mb-2">
                <p><strong>{e.qualification}</strong> — {e.score}</p>
                <p>{e.name}, {e.date}</p>
              </div>
            ))}
          </section>
        )}

        {/* Certifications */}
        {certification?.length > 0 && (
          <section>
            <h2 className="text-xl font-bold border-b border-gray-300 pb-1 mb-2">CERTIFICATIONS</h2>
            <ul className="list-disc list-inside">
              {certification.map((cert, i) => (
                <li key={i}>{cert.name} — {cert.date}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Other Information */}
        {otherInfomation?.length > 0 && (
          <section>
            <h2 className="text-xl font-bold border-b border-gray-300 pb-1 mb-2">OTHER INFORMATION</h2>
            <ul className="list-disc list-inside">
              {otherInfomation.map((info, i) => (
                <li key={i}>{info}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}

export default Resume;
