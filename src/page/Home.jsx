import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CiSaveDown1 } from "react-icons/ci";
import { IoAddSharp } from "react-icons/io5";
import { BsDash } from "react-icons/bs";
import {
  setCertificationStateAll,
  setCourseStateAll,
  setEducationStateAll,
  setHeaderOne,
  setInitial,
  setOtherCertificationStateAll,
  setProjectStateAll,
  setSkillStateAll,
  setSocialStateAll,
  setSummaryState,
  setWorkExperienceStateAll,
} from "../redux/Form/FormSlice";
import Resume from "./Resume";
import { toast } from "react-toastify";

function Home() {
  const dispatch = useDispatch();
  const headerOneState = useSelector((state) => state.FormSlice);

  const [isHydrated, setIsHydrated] = useState(false);

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

  const [social, setSocial] = useState({
    linkedin: "",
    github: "",
    leetcode: "",
    portfolio: "",
  });

  const [skills, setSkills] = useState([{ name: "", skills: [""] }]);

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

  const [courses, setCourses] = useState([]); // start empty

  const [educationList, setEducationList] = useState([]);

  const [certs, setCerts] = useState([]);

  const [otherInfo, setOtherInfo] = useState([]);

  useEffect(() => {
    if (!(localStorage.getItem("addvertise") == "done"))
      toast("Developer : Azimuddeen khan", {
        onClose: () => {
          toast("Inspect for console to see developer details.", {
            onClose: () => {
              localStorage.setItem("addvertise", "done");
            },
          });
        },
      });
  }, []);
  // console.log(headerOne)
  // console.log(headerOneState)
  // ⬇️ On mount, load localStorage and dispatch to Redux
  useEffect(() => {
    const savedForm = localStorage.getItem("form");
    if (savedForm) {
      const parsed = JSON.parse(savedForm);
      dispatch(setInitial(parsed));

      setHeaderOneLocal({ ...parsed.headerOne });
      setSocial({ ...parsed.social });
      setSummary({ summary: parsed.summary });
      setWorkExp([...parsed.workExperience]);
      setSkills([...parsed.skill]);
      setProjects([...parsed.project]);
      setCourses([...parsed.course]);
      setEducationList([...parsed.education]);
      setCerts([...parsed.certification]);
      setOtherInfo([...parsed.otherInfomation]);
    }

    setIsHydrated(true);
  }, [dispatch]);

  // ⬇️ Only save to localStorage if hydrated
  useEffect(() => {
    if (isHydrated) {
      // console.log(isHydrated);
      localStorage.setItem("form", JSON.stringify(headerOneState));
    }
  }, [headerOneState, isHydrated]);

  const c = ["name", "email", "address", "number"];

  const handleHeaderOne = () => {
    toast("the headers are added");
    dispatch(setHeaderOne(headerOne));
  };

  const handleSummary = () => {
    toast("the summary are added");
    dispatch(setSummaryState(summary));
  };

  const handleWorkExperienceSave = () => {
    toast("the work experience is added");
    dispatch(setWorkExperienceStateAll(workExp));
  };

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
  const handleMouseEnter = () => {
    const element = document.getElementById("preview-page");
    element.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="min-h-screen w-full bg-black/90 p-4 text-white">
      {/* <Issue/> */}
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
      <button
        className="absolute top-10 right-10 bg-black border border-white/30 rounded p-2"
        onClick={() => {
          handleMouseEnter();
        }}
      >
        Preview
      </button>

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
      <Social social={social} setSocial={setSocial} />
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
          <button
            className="p-2 rounded border border-white/30"
            onClick={addWorkExp}
            type="button"
          >
            <IoAddSharp />
          </button>
        </div>

        {workExp.map((item, i) => (
          <div
            key={i}
            className="flex flex-col gap-2 border p-3 border-white/30 rounded relative"
          >
            {/* ❌ Remove this experience block */}
            <button
              type="button"
              className="absolute top-2 right-2 p-1 text-red-500 border bg-black/90 border-white/20 rounded"
              onClick={() => {
                const updated = [...workExp];
                updated.splice(i, 1);
                setWorkExp(updated);
              }}
            >
              <BsDash />
            </button>

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
                    type="button"
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
                type="button"
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

        <button
          className="self-center p-2"
          onClick={handleWorkExperienceSave}
          type="button"
        >
          <CiSaveDown1 className="text-3xl" />
        </button>
      </div>

      {/* skill component */}
      <Skill skills={skills} setSkills={setSkills} />
      {/* Projects component */}
      <Project projects={projects} setProjects={setProjects} />
      {/* courses */}
      <Courses courses={courses} setCourses={setCourses} />
      {/* education */}
      <Education
        educationList={educationList}
        setEducationList={setEducationList}
      />
      {/* certification */}
      <Certifications certs={certs} setCerts={setCerts} />
      {/* other information */}
      <OtherInformation otherInfo={otherInfo} setOtherInfo={setOtherInfo} />
      <div
        id="preview-page"
        className={`w-full mt-10 border border-white/30 p-2 rounded`}
      >
        <Resume isHardCopy={true} isPrint={true} isLink={"hidden"} />
      </div>
    </div>
  );
}

const Skill = ({ skills, setSkills }) => {
  const dispatch = useDispatch();

  const handleAddCategory = () => {
    setSkills([...skills, { name: "", skills: [""] }]);
  };

  const handleRemoveCategory = (index) => {
    const updated = [...skills];
    updated.splice(index, 1);
    setSkills(updated);
  };

  const handleNameChange = (index, value) => {
    const updated = skills.map((category, i) =>
      i === index ? { ...category, name: value } : category
    );
    setSkills(updated);
  };

  const handleSkillChange = (catIndex, skillIndex, value) => {
    const updated = skills.map((category, i) => {
      if (i === catIndex) {
        const updatedSkills = [...category.skills];
        updatedSkills[skillIndex] = value;
        return { ...category, skills: updatedSkills };
      }
      return category;
    });
    setSkills(updated);
  };

  const handleAddSkillPoint = (catIndex) => {
    const updated = skills.map((category, i) => {
      if (i === catIndex) {
        return { ...category, skills: [...category.skills, ""] };
      }
      return category;
    });
    setSkills(updated);
  };

  const handleRemoveSkillPoint = (catIndex, skillIndex) => {
    setSkills((prevSkills) => {
      const updated = prevSkills.map((category, i) => ({
        ...category,
        skills: [...category.skills],
      }));
      if (updated[catIndex].skills.length > 1) {
        updated[catIndex].skills.splice(skillIndex, 1);
      }
      return updated;
    });
  };

  const handleSkillSave = () => {
    toast("The skills have been saved!");
    dispatch(setSkillStateAll(skills));
  };

  return (
    <div>
      <div className="flex items-center gap-3 p-2">
        <h1 className="text-2xl font-semibold">Skills</h1>
        <button
          className="p-2 rounded border border-white/30"
          onClick={handleAddCategory}
          type="button"
        >
          <IoAddSharp />
        </button>
      </div>

      <div className="flex flex-col gap-4 p-2 border border-white/30">
        {skills.map((category, i) => (
          <div key={i} className="border p-3 rounded space-y-2 relative">
            {/* ❌ Remove category button on this block */}
            <button
              type="button"
              onClick={() => handleRemoveCategory(i)}
              className="absolute top-2 right-2 p-1 text-red-400 border bg-black border-white/20 rounded"
            >
              <BsDash />
            </button>

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
                  disabled={category.skills.length === 1}
                  className="border px-2 rounded disabled:opacity-50"
                  type="button"
                >
                  <BsDash />
                </button>
              </div>
            ))}

            <button
              className="text-sm underline text-blue-400"
              onClick={() => handleAddSkillPoint(i)}
              type="button"
            >
              + Add more points
            </button>
          </div>
        ))}
      </div>

      <button className="self-center p-2" onClick={handleSkillSave} type="button">
        <CiSaveDown1 className="text-3xl" />
      </button>
    </div>
  );
};

const Project = ({ projects, setProjects }) => {
  const dispatch = useDispatch();

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

  const removeProjectByIndex = (index) => {
    if (projects.length <= 1) return;
    const updated = [...projects];
    updated.splice(index, 1);
    setProjects(updated);
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
    toast("The project is added");
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
          type="button"
        >
          <IoAddSharp size={20} />
        </button>
      </div>

      {projects.map((project, i) => (
        <div key={i} className="mb-6 border p-3 rounded relative">
          {/* Always show the delete button, but disable if only one project */}
          <button
            type="button"
            className={`absolute top-2 right-2 p-1 border rounded ${
              projects.length <= 1
                ? "opacity-50 cursor-not-allowed text-red-300 border-white/20"
                : "text-red-400 bg-black border-white/30 hover:bg-white hover:text-black"
            }`}
            onClick={() => removeProjectByIndex(i)}
            disabled={projects.length <= 1}
            title="Remove this project"
            aria-label="Remove this project"
          >
            <BsDash />
          </button>

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
            type="button"
            className="text-sm mt-1 underline text-blue-400"
            onClick={() => addPoint(i)}
          >
            + Add another point
          </button>

          {/* Links Section */}
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
        Mention at least 3 projects in a similar manner with diverse skill sets (maximum 5)
      </p>

      <button
        className="self-center p-2 mt-4 border border-white/30 rounded"
        onClick={handleProjectSave}
        title="Save Projects"
        aria-label="Save Projects"
        type="button"
      >
        <CiSaveDown1 className="text-3xl" />
      </button>
    </div>
  );
};


const Courses = ({ courses, setCourses }) => {
  const dispatch = useDispatch();

  const addCourse = () => {
    if (courses.length >= 10) return;
    setCourses([
      ...courses,
      { name: "", startDate: "", endDate: "", coursework: [""] },
    ]);
  };

  const removeCourse = (index) => {
    if (courses.length <= 1) return;
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

  const handleCourseSave = () => {
    toast("The courses are added");
    dispatch(setCourseStateAll(courses));
  };

  return (
    <div className="mt-5 p-4 text-white border border-white/30 rounded w-full mx-auto">
      <h2 className="text-xl font-bold mb-4">Courses</h2>

      {/* Global Add Button */}
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
        <p className="text-gray-400 italic">
          No courses added yet. Click + to add a course.
        </p>
      )}

      {courses.map((course, i) => (
        <div
          key={i}
          className="mb-6 border border-white/30 p-4 rounded relative bg-black/30"
        >
          {/* Delete button always visible but disabled if only one course */}
          <button
            onClick={() => removeCourse(i)}
            disabled={courses.length <= 1}
            className={`absolute top-2 right-2 p-1 rounded border text-red-400 ${
              courses.length <= 1
                ? "opacity-50 cursor-not-allowed border-white/20"
                : "hover:bg-white hover:text-black border-white/30"
            }`}
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

      <button
        className="self-center p-2 border border-white/30 rounded m-2"
        onClick={handleCourseSave}
      >
        <CiSaveDown1 className="text-3xl" />
      </button>
    </div>
  );
};

const Education = ({ educationList, setEducationList }) => {
  const dispatch = useDispatch();

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
    if (educationList.length <= 1) return;
    const updated = [...educationList];
    updated.splice(index, 1);
    setEducationList(updated);
  };

  const updateField = (index, field, value) => {
    const updated = [...educationList];
    updated[index][field] = value;
    setEducationList(updated);
  };

  const handleEducationSave = () => {
    toast("The education is added");
    dispatch(setEducationStateAll(educationList));
  };

  return (
    <div className="p-4 text-white border border-white/30 rounded w-full m-4 mx-auto">
      <h2 className="text-xl font-bold mb-4">Education</h2>

      {/* Add Button */}
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

      {/* No data message */}
      {educationList.length === 0 && (
        <p className="text-gray-400 italic">
          No education entries yet. Click + to add one.
        </p>
      )}

      {/* Education Fields */}
      {educationList.map((edu, i) => (
        <div
          key={i}
          className="mb-6 border border-white/30 p-4 rounded relative bg-black/30"
        >
          {/* Delete Button (always visible but disabled on 1 item) */}
          <button
            onClick={() => removeEducation(i)}
            disabled={educationList.length <= 1}
            className={`absolute top-2 right-2 p-1 rounded border ${
              educationList.length <= 1
                ? "opacity-50 cursor-not-allowed text-red-300 border-white/20 bg-black"
                : "text-red-400 border-white/30 bg-black hover:bg-white hover:text-black"
            }`}
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

      {/* Save Button */}
      <button
        className="self-center p-2 border border-white/30 rounded m-2"
        onClick={handleEducationSave}
      >
        <CiSaveDown1 className="text-3xl" />
      </button>
    </div>
  );
};

const Certifications = ({ certs, setCerts }) => {
  const dispatch = useDispatch();

  const addCert = () => {
    if (certs.length >= 10) return;
    setCerts([...certs, { name: "", date: "" }]);
  };

  const removeCert = (index) => {
    if (certs.length <= 1) return;
    setCerts(certs.filter((_, i) => i !== index));
  };

  const updateCert = (index, field, value) => {
    const updated = [...certs];
    updated[index][field] = value;
    setCerts(updated);
  };

  const handleCertificationSave = () => {
    toast("The certification is added");
    dispatch(setCertificationStateAll(certs));
  };

  return (
    <div className="p-4 text-white border border-white/30 rounded w-full mx-auto">
      <h2 className="text-xl font-bold mb-4">Certifications</h2>

      {/* Add Button */}
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

      {/* Empty message */}
      {certs.length === 0 && (
        <p className="text-gray-400 italic">
          No certifications added yet. Click + to add.
        </p>
      )}

      {/* Certification Entries */}
      {certs.map((cert, i) => (
        <div
          key={i}
          className="mb-6 border border-white/30 p-4 rounded relative bg-black/30"
        >
          {/* Remove Button (disabled if only 1) */}
          <button
            onClick={() => removeCert(i)}
            disabled={certs.length <= 1}
            className={`absolute top-2 right-2 p-1 rounded border ${
              certs.length <= 1
                ? "opacity-50 cursor-not-allowed text-red-300 border-white/20 bg-black"
                : "text-red-400 border-white/30 bg-black hover:bg-white hover:text-black"
            }`}
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

      {/* Save Button */}
      <button
        className="self-center p-2 border border-white/30 rounded m-2"
        onClick={handleCertificationSave}
      >
        <CiSaveDown1 className="text-3xl" />
      </button>
    </div>
  );
};

const OtherInformation = ({ otherInfo, setOtherInfo }) => {
  const dispatch = useDispatch();

  const addPoint = () => {
    if (otherInfo.length >= 20) return;
    setOtherInfo([...otherInfo, ""]);
  };

  const removePoint = (index) => {
    if (otherInfo.length <= 1) return;
    setOtherInfo(otherInfo.filter((_, i) => i !== index));
  };

  const updatePoint = (index, value) => {
    const updated = [...otherInfo];
    updated[index] = value;
    setOtherInfo(updated);
  };

  const handleOtherInformationSave = () => {
    toast.success("The information is added");
    dispatch(setOtherCertificationStateAll(otherInfo));
  };

  return (
    <div className="p-4 text-white border border-white/30 rounded w-full mt-5 mx-auto">
      <h2 className="text-xl font-bold mb-4">Other Information</h2>
      <p className="text-sm text-gray-300 mb-2">
        Awards & Achievements / Volunteering Experience — Add if any
      </p>

      {/* Add Button */}
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

      {/* Empty State */}
      {otherInfo.length === 0 && (
        <p className="text-gray-400 italic">
          No other information added yet. Click + to add a point.
        </p>
      )}

      {/* Points List */}
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
              disabled={otherInfo.length <= 1}
              className={`p-1 rounded border ${
                otherInfo.length <= 1
                  ? "opacity-50 cursor-not-allowed text-red-300 border-white/20 bg-black"
                  : "text-red-400 border-white/30 bg-black hover:bg-red-500 hover:text-white"
              }`}
              title="Remove point"
            >
              <BsDash size={16} />
            </button>
          </li>
        ))}
      </ul>

      {/* Save Button */}
      <button
        className="self-center p-2 border border-white/30 rounded m-2"
        onClick={handleOtherInformationSave}
      >
        <CiSaveDown1 className="text-3xl" />
      </button>
    </div>
  );
};

const Social = ({ social, setSocial }) => {
  const dispatch = useDispatch();

  const handleSocialLink = () => {
    dispatch(setSocialStateAll(social));
    toast.success("Social links are added");
  };

  return (
    <div className="w-full flex flex-col gap-3">
      {Object.keys(social).map((key, i) => (
        <input
          key={i}
          type="text"
          placeholder={key}
          value={social[key]}
          onChange={(e) => setSocial({ ...social, [key]: e.target.value })}
          className="border border-white/30 w-full p-2 rounded bg-transparent text-white placeholder:text-white/60 placeholder:capitalize focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      ))}
      <button
        onClick={handleSocialLink}
        className="self-center p-2 border border-white/30 rounded hover:bg-white hover:text-black transition-colors"
        title="Save Social Links"
        aria-label="Save Social Links"
        type="button"
      >
        <CiSaveDown1 className="text-3xl" />
      </button>
    </div>
  );
};

export default Home;
