import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CiSaveDown1 } from "react-icons/ci";
import { IoAddSharp } from "react-icons/io5";
import { BsDash } from "react-icons/bs";
import { setCertificationStateAll, setCourseStateAll, setEducationStateAll, setHeaderOne, setOtherCertificationStateAll, setProjectStateAll, setSkillStateAll, setSocialStateAll, setSummaryState, setWorkExperienceStateAll } from "../redux/Form/FormSlice";
import Resume from "./Resume";
import { toast } from "react-toastify";

function Home() {
  const headerOneState = useSelector((state) => state.FormSlice);
  console.log(headerOneState)
  const dispatch = useDispatch();

  const [headerOne, setHeaderOneLocal] = useState({
    ...headerOneState.headerOne,
  });

  const [summary, setSummary] = useState({ summary: headerOneState.summary });

  const [workExp, setWorkExp] = useState([
    {
      company_name: "",
      role: "",
      start: "",
      end: "",
      points: [],
    },
  ]);

  const c = ["name", "email", "address", "number"];

  const handleHeaderOne = () => {
    toast("the headers are added")
    dispatch(setHeaderOne(headerOne));
  };

  const handleSummary = () => {
    toast("the summary are added")
    dispatch(setSummaryState(summary));
  };

  const handleWorkExperienceSave = ()=>{
    toast("the work experience is added")
    dispatch(setWorkExperienceStateAll(workExp))
  }


  const addWorkExp = () => {
    setWorkExp((prev) => [
      ...prev,
      {
        company_name: "",
        role: "",
        start: "",
        end: "",
        points: [],
      },
    ]);
  };

  const removeWorkExp = () => {
    setWorkExp((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };
  // const [preview,setpreview] = useState(false)
  const handleMouseEnter = ()=>{
    const element = document.getElementById("preview-page")
    element.scrollIntoView({behavior:'smooth'})
  }
  return (
    <div className="min-h-screen w-full bg-black/90 p-4 text-white">
      
      <Link
        className="absolute border border-white/30 p-2 rounded bg-black/70"
        to={"/resume"}
      >
        Resume
      </Link>
      <Link
        className="absolute left-30 border border-white/30 p-2 rounded bg-black/70"
        to={"/resume-format"}
      >
        Resume Format
      </Link>
      <button className="absolute top-10 right-10 bg-black border border-white/30 rounded p-2" onClick={()=>{handleMouseEnter()}}  >Preview</button>

      {/* Header Inputs */}
      <div className="w-full flex flex-col py-2 gap-2 mt-10">
        <h1 className="text-2xl font-semibold">Introduction</h1>
        {c.map((d) => (
          <input
            key={d}
            type="text"
            placeholder={d}
            className="p-2 border border-white/30 placeholder:capitalize"
            value={headerOne[d]}
            onChange={(e) => {
              setHeaderOneLocal((prev) => ({
                ...prev,
                [d]: e.target.value,
              }));
            }}
          />
        ))}
        <button className="self-center p-2" onClick={handleHeaderOne}>
          <CiSaveDown1 className="text-3xl" />
        </button>
      </div>
        <Social/>
      {/* Summary Section */}
      <div className="flex flex-col gap-3 mt-6">
        <h1 className="text-2xl font-semibold">Summary</h1>
        <textarea
          placeholder="Summary"
          className="p-2 rounded border border-white/30 w-full resize-none placeholder:text-white"
          rows={10}
          value={summary.summary}
          onChange={(e) => setSummary({ summary: e.target.value })}
        />
        <button className="self-center p-2" onClick={handleSummary}>
          <CiSaveDown1 className="text-3xl" />
        </button>
      </div>

      {/* Work Experience Section */}
      <div className="flex flex-col gap-4 mt-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold">Work Experience</h1>
          <button className="p-2 rounded border border-white/30" onClick={addWorkExp}>
            <IoAddSharp />
          </button>
          <button className="p-2 rounded border border-white/30" onClick={removeWorkExp}>
            <BsDash />
          </button>
        </div>

        {workExp.map((item, i) => (
          <div
            key={i}
            className="flex flex-col gap-2 border p-3 border-white/30 rounded"
          >
            <input
              type="text"
              placeholder="Company Name"
              className="p-2 border border-white/30 placeholder:capitalize"
              value={item.company_name}
              onChange={(e) => {
                const updated = [...workExp];
                updated[i].company_name = e.target.value;
                setWorkExp(updated);
              }}
            />
            <input
              type="text"
              placeholder="Role"
              className="p-2 border border-white/30 placeholder:capitalize"
              value={item.role}
              onChange={(e) => {
                const updated = [...workExp];
                updated[i].role = e.target.value;
                setWorkExp(updated);
              }}
            />
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Start Date"
                className="p-2 border border-white/30 w-1/2"
                value={item.start}
                onChange={(e) => {
                  const updated = [...workExp];
                  updated[i].start = e.target.value;
                  setWorkExp(updated);
                }}
              />
              <input
                type="text"
                placeholder="End Date"
                className="p-2 border border-white/30 w-1/2"
                value={item.end}
                onChange={(e) => {
                  const updated = [...workExp];
                  updated[i].end = e.target.value;
                  setWorkExp(updated);
                }}
              />
            </div>

            {/* Points Section */}
            <div className="flex flex-col gap-2 mt-2">
              <h2 className="font-semibold">Points</h2>
              {item.points.map((point, pi) => (
                <div key={pi} className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder={`Point ${pi + 1}`}
                    className="p-2 border border-white/30 w-full"
                    value={point}
                    onChange={(e) => {
                      const updated = [...workExp];
                      updated[i].points[pi] = e.target.value;
                      setWorkExp(updated);
                    }}
                  />
                  <button
                    onClick={() => {
                      const updated = [...workExp];
                      updated[i].points.splice(pi, 1);
                      setWorkExp(updated);
                    }}
                    className="text-red-400"
                  >
                    <BsDash />
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const updated = [...workExp];
                  updated[i].points.push("");
                  setWorkExp(updated);
                }}
                className="border px-3 py-1 mt-1 border-white/30 rounded text-sm w-fit"
              >
                Add Point
              </button>
            </div>
          </div>
        ))}
        <button className="self-center p-2" onClick={handleWorkExperienceSave}>
          <CiSaveDown1 className="text-3xl" />
        </button>
      </div>
      {/* skill component */}
      <Skill/>
      {/* Projects component */}
      <Project/>
      {/* courses */}
      <Courses/>
      {/* education */}
      <Education/>
      {/* certification */}
      <Certifications/>
      {/* other information */}
      <OtherInformation/>
      <div id="preview-page" className={`w-full mt-10 border border-white/30 p-2 rounded`} >
        <Resume isLink={"hidden"}/>
      </div>
    </div>
  );
}

export default Home;

const Skill = () => {
  const dispatch = useDispatch()
  const [skills, setSkills] = useState([
    { name: "", skills: [""] }
  ]);

  // Add new skill category
  const handleAddCategory = () => {
    setSkills([...skills, { name: "", skills: [""] }]);
  };

  // Remove last skill category
  const handleRemoveCategory = () => {
    if (skills.length > 1)
      setSkills(skills.slice(0, -1));
  };

  // Update category name
  const handleNameChange = (index, value) => {
    const updated = [...skills];
    updated[index].name = value;
    setSkills(updated);
  };

  // Update a skill point
  const handleSkillChange = (catIndex, skillIndex, value) => {
    const updated = [...skills];
    updated[catIndex].skills[skillIndex] = value;
    setSkills(updated);
  };

  // Add a skill point
  const handleAddSkillPoint = (catIndex) => {
    const updated = [...skills];
    updated[catIndex].skills.push("");
    setSkills(updated);
  };

  // Remove a skill point
  const handleRemoveSkillPoint = (catIndex, skillIndex) => {
    const updated = [...skills];
    if (updated[catIndex].skills.length > 1) {
      updated[catIndex].skills.splice(skillIndex, 1);
      setSkills(updated);
    }
  };

  console.log(skills)

  const handleSkillSave = ()=>{
    toast("the skill is added")
    dispatch(setSkillStateAll(skills))
  }

  return (
    <div>
      <div className="flex items-center gap-3 p-2">
        <h1 className="text-2xl font-semibold">Skills</h1>
        <button className="p-2 rounded border border-white/30" onClick={handleAddCategory}>
          <IoAddSharp />
        </button>
        <button className="p-2 rounded border border-white/30" onClick={handleRemoveCategory}>
          <BsDash />
        </button>
      </div>

      <div className="flex flex-col gap-4 p-2 border border-white/30">
        {skills.map((category, i) => (
          <div key={i} className="border p-3 rounded space-y-2">
            <input
              type="text"
              placeholder="Skill Category (e.g., Frontend)"
              className="rounded p-2 border border-white/30 w-full"
              value={category.name}
              onChange={(e) => handleNameChange(i, e.target.value)}
            />

            {category.skills.map((skill, j) => (
              <div key={j} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Skill (e.g., React)"
                  className="rounded p-2 border border-white/30 w-full"
                  value={skill}
                  onChange={(e) => handleSkillChange(i, j, e.target.value)}
                />
                <button
                  onClick={() => handleRemoveSkillPoint(i, j)}
                  className="border px-2 rounded"
                >
                  <BsDash />
                </button>
              </div>
            ))}

            <button
              className="text-sm underline text-blue-400"
              onClick={() => handleAddSkillPoint(i)}
            >
              + Add more points
            </button>
          </div>
        ))}
      </div>

      <button className="self-center p-2" onClick={handleSkillSave}>
          <CiSaveDown1 className="text-3xl" />
        </button>
    </div>
  );
};


const Project = () => {
  const dispatch = useDispatch();

  const [projects, setProjects] = useState([
    {
      title: "",
      tech: "",
      points: [""],
      links: {
        linkedin: "",
        github: "",
        portfolio: "",
      },
    },
  ]);

  const addProject = () => {
    if (projects.length >= 5) return;
    setProjects([
      ...projects,
      {
        title: "",
        tech: "",
        points: [""],
        links: {
          linkedin: "",
          github: "",
          portfolio: "",
        },
      },
    ]);
  };

  const removeProject = () => {
    if (projects.length <= 1) return;
    setProjects(projects.slice(0, projects.length - 1));
  };

  const updateProject = (i, field, value) => {
    const updated = [...projects];
    updated[i][field] = value;
    setProjects(updated);
  };

  const updatePoint = (projIndex, pointIndex, value) => {
    const updated = [...projects];
    updated[projIndex].points[pointIndex] = value;
    setProjects(updated);
  };

  const addPoint = (i) => {
    const updated = [...projects];
    updated[i].points.push("");
    setProjects(updated);
  };

  const updateLink = (projIndex, field, value) => {
    const updated = [...projects];
    updated[projIndex].links[field] = value;
    setProjects(updated);
  };

  const handleProjectSave = () => {
    toast("the project is added")
    dispatch(setProjectStateAll(projects));
  };

  return (
    <div className="p-4 text-white border border-white/30 rounded">
      <h2 className="text-xl font-bold mb-4">PROJECTS</h2>

      <div className="flex gap-2 p-4">
        <button
          onClick={addProject}
          disabled={projects.length >= 5}
          className={`text-white border border-white/30 p-2 rounded ${
            projects.length >= 5 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          title="Add project"
          aria-label="Add project"
        >
          <IoAddSharp size={20} />
        </button>

        <button
          onClick={removeProject}
          disabled={projects.length <= 1}
          className={`text-white border border-white/30 p-2 rounded ${
            projects.length <= 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          title="Remove project"
          aria-label="Remove project"
        >
          <BsDash size={20} />
        </button>
      </div>

      {projects.map((project, i) => (
        <div key={i} className="mb-6 border p-3 rounded relative">
          <input
            type="text"
            placeholder="Project Title"
            className="w-full p-2 rounded border border-white/30 mb-2"
            value={project.title}
            onChange={(e) => updateProject(i, "title", e.target.value)}
          />
          <input
            type="text"
            placeholder="Tech Used (e.g. Python, React)"
            className="w-full p-2 rounded border border-white/30 mb-2"
            value={project.tech}
            onChange={(e) => updateProject(i, "tech", e.target.value)}
          />

          <ul className="list-disc pl-6">
            {project.points.map((pt, j) => (
              <li key={j} className="mb-1">
                <input
                  type="text"
                  placeholder="Point"
                  className="w-full p-1 rounded border border-white/30"
                  value={pt}
                  onChange={(e) => updatePoint(i, j, e.target.value)}
                />
              </li>
            ))}
          </ul>
          <button
            className="text-sm mt-1 underline text-blue-400"
            onClick={() => addPoint(i)}
          >
            + Add another point
          </button>

          {/* Links inputs inside each project */}
          <div className="mt-4 space-y-3">
            <div>
              <label
                htmlFor={`linkedin-${i}`}
                className="block mb-1 text-sm text-gray-300"
              >
                LinkedIn URL:
              </label>
              <input
                id={`linkedin-${i}`}
                type="url"
                placeholder="https://linkedin.com/in/yourprofile"
                className="w-full p-2 rounded border border-white/30 bg-transparent text-white"
                value={project.links.linkedin}
                onChange={(e) => updateLink(i, "linkedin", e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor={`github-${i}`}
                className="block mb-1 text-sm text-gray-300"
              >
                GitHub URL:
              </label>
              <input
                id={`github-${i}`}
                type="url"
                placeholder="https://github.com/yourusername"
                className="w-full p-2 rounded border border-white/30 bg-transparent text-white"
                value={project.links.github}
                onChange={(e) => updateLink(i, "github", e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor={`portfolio-${i}`}
                className="block mb-1 text-sm text-gray-300"
              >
                Portfolio URL:
              </label>
              <input
                id={`portfolio-${i}`}
                type="url"
                placeholder="https://yourportfolio.com"
                className="w-full p-2 rounded border border-white/30 bg-transparent text-white"
                value={project.links.portfolio}
                onChange={(e) => updateLink(i, "portfolio", e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}

      <p className="mt-4 text-sm text-gray-300">
        Mention at least 3 projects in a similar manner with diverse skill sets
        (maximum 5)
      </p>

      <button
        className="self-center p-2 mt-4 border border-white/30 rounded"
        onClick={handleProjectSave}
        title="Save Projects"
        aria-label="Save Projects"
      >
        <CiSaveDown1 className="text-3xl" />
      </button>
    </div>
  );
};

const Courses = () => {
  const [courses, setCourses] = useState([]); // start empty

  const addCourse = () => {
    if (courses.length >= 10) return;
    setCourses([
      ...courses,
      { name: "", startDate: "", endDate: "", coursework: [""] },
    ]);
  };

  const removeCourse = (index) => {
    setCourses(courses.filter((_, i) => i !== index));
  };

  const updateCourseField = (index, field, value) => {
    const updated = [...courses];
    updated[index][field] = value;
    setCourses(updated);
  };

  const addCourseworkPoint = (index) => {
    const updated = [...courses];
    updated[index].coursework.push("");
    setCourses(updated);
  };

  const updateCourseworkPoint = (courseIndex, pointIndex, value) => {
    const updated = [...courses];
    updated[courseIndex].coursework[pointIndex] = value;
    setCourses(updated);
  };

  const removeCourseworkPoint = (courseIndex, pointIndex) => {
    const updated = [...courses];
    if (updated[courseIndex].coursework.length <= 1) return;
    updated[courseIndex].coursework.splice(pointIndex, 1);
    setCourses(updated);
  };

  const dispatch = useDispatch()
  const handleCourseSave = ()=>{
    toast("the courses are added")
    dispatch(setCourseStateAll(courses))
  }

  return (
    <div className=" mt-5 p-4 text-white border border-white/30 rounded w-full mx-auto">
      <h2 className="text-xl font-bold mb-4">Courses</h2>

      {/* Show add course button always */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={addCourse}
          disabled={courses.length >= 10}
          className={`p-2 border border-white/30 rounded ${
            courses.length >= 10 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          title="Add course"
          aria-label="Add course"
        >
          <IoAddSharp size={20} />
        </button>
      </div>

      {courses.length === 0 && (
        <p className="text-gray-400 italic">No courses added yet. Click + to add a course.</p>
      )}

      {courses.map((course, i) => (
        <div
          key={i}
          className="mb-6 border border-white/30 p-4 rounded relative bg-black/30"
        >
          {/* Remove course button */}
          <button
            onClick={() => removeCourse(i)}
            className="absolute top-2 right-2 p-1 bg-black rounded border border-white/30 hover:bg-white hover:text-black"
            title="Remove course"
            aria-label="Remove course"
          >
            <BsDash size={18} />
          </button>

          <input
            type="text"
            placeholder="Course Name (e.g., Masters in Data Software Engineering)"
            className="w-full p-2 mb-2 rounded border border-white/30 bg-transparent text-white"
            value={course.name}
            onChange={(e) => updateCourseField(i, "name", e.target.value)}
          />

          <div className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="Start Date (e.g., Jan 2024)"
              className="flex-1 p-2 rounded border border-white/30 bg-transparent text-white"
              value={course.startDate}
              onChange={(e) => updateCourseField(i, "startDate", e.target.value)}
            />
            <input
              type="text"
              placeholder="End Date (e.g., Present)"
              className="flex-1 p-2 rounded border border-white/30 bg-transparent text-white"
              value={course.endDate}
              onChange={(e) => updateCourseField(i, "endDate", e.target.value)}
            />
          </div>

          <div>
            <h3 className="mb-2 text-sm font-semibold text-gray-300">Coursework:</h3>
            <ul className="list-disc pl-6 space-y-1">
              {course.coursework.map((point, j) => (
                <li key={j} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Coursework point"
                    className="flex-grow p-1 rounded border border-white/30 bg-transparent text-white"
                    value={point}
                    onChange={(e) =>
                      updateCourseworkPoint(i, j, e.target.value)
                    }
                  />
                  <button
                    onClick={() => removeCourseworkPoint(i, j)}
                    disabled={course.coursework.length <= 1}
                    className={`p-1 rounded border border-white/30 text-red-400 ${
                      course.coursework.length <= 1
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-red-600 hover:text-white"
                    }`}
                    title="Remove coursework point"
                    aria-label="Remove coursework point"
                  >
                    <BsDash size={14} />
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => addCourseworkPoint(i)}
              className="mt-2 text-sm underline text-blue-400"
              aria-label="Add coursework point"
            >
              + Add another coursework point
            </button>
          </div>
        </div>
      ))}
      <button className="self-center p-2 border border-white/30 rounded m-2" onClick={handleCourseSave}>
          <CiSaveDown1 className="text-3xl" />
        </button>
    </div>
  );
};

const Education = () => {
  const [educationList, setEducationList] = useState([]);

  const addEducation = () => {
    if (educationList.length >= 10) return;
    setEducationList([
      ...educationList,
      {
        qualification: "",
        name: "",
        score: "",
        date: "",
      },
    ]);
  };

  const removeEducation = (index) => {
    const updated = [...educationList];
    updated.splice(index, 1);
    setEducationList(updated);
  };

  const updateField = (index, field, value) => {
    const updated = [...educationList];
    updated[index][field] = value;
    setEducationList(updated);
  };

  const dispatch = useDispatch()
  const handleEducationSave = ()=>{
    toast("the education is added")
    dispatch(setEducationStateAll(educationList))
  }

  return (
    <div className="p-4 text-white border border-white/30 rounded w-full m-4 mx-auto">
      <h2 className="text-xl font-bold mb-4">Education</h2>

      {/* Add button always visible */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={addEducation}
          disabled={educationList.length >= 10}
          className={`p-2 border border-white/30 rounded ${
            educationList.length >= 10 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          title="Add education"
        >
          <IoAddSharp size={20} />
        </button>
      </div>

      {educationList.length === 0 && (
        <p className="text-gray-400 italic">No education entries yet. Click + to add one.</p>
      )}

      {educationList.map((edu, i) => (
        <div
          key={i}
          className="mb-6 border border-white/30 p-4 rounded relative bg-black/30"
        >
          {/* Remove button */}
          <button
            onClick={() => removeEducation(i)}
            className="absolute top-2 right-2 p-1 rounded border border-white/30 hover:bg-white bg-black hover:text-black"
            title="Remove education"
          >
            <BsDash size={18} />
          </button>

          <input
            type="text"
            placeholder="Qualification (e.g., Bachelor's of Engineering)"
            className="w-full p-2 mb-2 rounded border border-white/30 bg-transparent text-white"
            value={edu.qualification}
            onChange={(e) => updateField(i, "qualification", e.target.value)}
          />

          <input
            type="text"
            placeholder="Institution/Board Name"
            className="w-full p-2 mb-2 rounded border border-white/30 bg-transparent text-white"
            value={edu.name}
            onChange={(e) => updateField(i, "name", e.target.value)}
          />

          <input
            type="text"
            placeholder="CGPA / Percentage (e.g., 8.32 CGPA / 90%)"
            className="w-full p-2 mb-2 rounded border border-white/30 bg-transparent text-white"
            value={edu.score}
            onChange={(e) => updateField(i, "score", e.target.value)}
          />

          <input
            type="text"
            placeholder="Year or Date (e.g., 2022)"
            className="w-full p-2 rounded border border-white/30 bg-transparent text-white"
            value={edu.date}
            onChange={(e) => updateField(i, "date", e.target.value)}
          />
        </div>
      ))}
      <button className="self-center p-2 border border-white/30 rounded m-2" onClick={handleEducationSave}>
          <CiSaveDown1 className="text-3xl" />
        </button>
    </div>
  );
};

const Certifications = () => {
  const [certs, setCerts] = useState([]);

  const addCert = () => {
    if (certs.length >= 10) return;
    setCerts([...certs, { name: "", date: "" }]);
  };

  const removeCert = (index) => {
    setCerts(certs.filter((_, i) => i !== index));
  };

  const updateCert = (index, field, value) => {
    const updated = [...certs];
    updated[index][field] = value;
    setCerts(updated);
  };

  const dispatch = useDispatch()
  const handleCertificationSave = ()=>{
    toast("the certification is added")
    dispatch(setCertificationStateAll(certs))
  }

  return (
    <div className="p-4 text-white border border-white/30 rounded w-full mx-auto">
      <h2 className="text-xl font-bold mb-4">Certifications</h2>

      <div className="flex gap-2 mb-4">
        <button
          onClick={addCert}
          disabled={certs.length >= 10}
          className={`p-2 border border-white/30 rounded ${
            certs.length >= 10 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          title="Add certification"
        >
          <IoAddSharp size={20} />
        </button>
      </div>

      {certs.length === 0 && (
        <p className="text-gray-400 italic">
          No certifications added yet. Click + to add.
        </p>
      )}

      {certs.map((cert, i) => (
        <div
          key={i}
          className="mb-6 border border-white/30 p-4 rounded relative bg-black/30"
        >
          {/* Remove button */}
          <button
            onClick={() => removeCert(i)}
            className="absolute top-2 right-2 p-1 rounded border border-white/30 hover:bg-white hover:text-black"
            title="Remove certification"
          >
            <BsDash size={18} />
          </button>

          <input
            type="text"
            placeholder="Certification Name (e.g., Data Analysis with Python from IBM)"
            className="w-full p-2 mb-2 rounded border border-white/30 bg-transparent text-white"
            value={cert.name}
            onChange={(e) => updateCert(i, "name", e.target.value)}
          />

          <input
            type="text"
            placeholder="Month & Year (e.g., Jan 2024)"
            className="w-full p-2 rounded border border-white/30 bg-transparent text-white"
            value={cert.date}
            onChange={(e) => updateCert(i, "date", e.target.value)}
          />
        </div>
        
      ))}

        <button className="self-center p-2 border border-white/30 rounded m-2" onClick={handleCertificationSave}>
          <CiSaveDown1 className="text-3xl" />
        </button>
    </div>
  );
};

const OtherInformation = () => {
  const [otherInfo, setOtherInfo] = useState([]);

  // Add a new blank point
  const addPoint = () => {
    setOtherInfo([...otherInfo, ""]);
  };

  // Remove a point
  const removePoint = (index) => {
    setOtherInfo(otherInfo.filter((_, i) => i !== index));
  };

  // Update a point
  const updatePoint = (index, value) => {
    const updated = [...otherInfo];
    updated[index] = value;
    setOtherInfo(updated);
  };

  const dispatch = useDispatch()
  const handleOtherInformationSave = ()=>{
    toast.success("the information is  added")
    dispatch(setOtherCertificationStateAll(otherInfo))
  }

  return (
    <div className="p-4 text-white border border-white/30 rounded w-full mt-5 mx-auto">
      <h2 className="text-xl font-bold mb-4">Other Information</h2>
      <p className="text-sm text-gray-300 mb-2">
        Awards & Achievements / Volunteering Experience — Add if any
      </p>

      <div className="flex gap-2 mb-4">
        <button
          onClick={addPoint}
          disabled={otherInfo.length >= 20}
          className={`p-2 border border-white/30 rounded ${
            otherInfo.length >= 20 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          title="Add point"
        >
          <IoAddSharp size={20} />
        </button>
      </div>

      {otherInfo.length === 0 && (
        <p className="text-gray-400 italic">
          No other information added yet. Click + to add a point.
        </p>
      )}

      <ul className="list-disc pl-6 space-y-2">
        {otherInfo.map((info, index) => (
          <li key={index} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="e.g., Volunteered at NGO for child education"
              className="flex-grow p-2 rounded border border-white/30 bg-transparent text-white"
              value={info}
              onChange={(e) => updatePoint(index, e.target.value)}
            />
            <button
              onClick={() => removePoint(index)}
              className="p-1 rounded border border-white/30 text-red-400 hover:bg-red-500 hover:text-white"
              title="Remove point"
            >
              <BsDash size={16} />
            </button>
          </li>
        ))}
      </ul>
      <button className="self-center p-2 border border-white/30 rounded m-2" onClick={handleOtherInformationSave}>
          <CiSaveDown1 className="text-3xl" />
        </button>
    </div>
  );
};

const Social = ()=>{
  const dispatch = useDispatch()
  const [social,setSocial] = useState({
    linkedin:'',
    github:'',
    leetcode:'',
    portfolio:''
  })
  
  const handleSocialLink = ()=>{
      console.log("Clicked")
    dispatch(setSocialStateAll(social))
  }

  return <div className="w-full flex flex-col gap-2" >
    {
      Object.keys(social).map((v,i)=>{
        // console.log(v)
          return <input value={social[v]} onChange={(e)=>{setSocial({...social,[v]:e.target.value})}} className="border border-white/30 w-full p-2 placeholder:text-white/60 placeholder:capitalize" key={i} type="text" placeholder={v} />
      })
    }
    <button className="self-center p-2 border border-white/30 rounded m-2" onClick={()=>handleSocialLink()}>
          <CiSaveDown1 className="text-3xl" />
        </button>
  </div>
}