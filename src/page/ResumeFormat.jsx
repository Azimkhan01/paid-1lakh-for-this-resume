import React from "react";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
function ResumeFormat() {
  return (
    <>
      <Link
        to={"/"}
        className="absolute top-10 left-10  border border-black/40 p-2 rounded"
      >
        <FaRegEdit />
      </Link>
      <div className="border border-black/30 mt-10 rounded max-w-4xl mx-auto p-6 text-gray-900 font-sans space-y-6">
        <header className="text-center space-y-1">
          <h1 className="text-3xl font-bold">YOUR NAME</h1>
          <p>
            +91 60000 00004 |{" "}
            <a
              href="mailto:abcxxxxxx1@gmail.com"
              className="text-blue-600 underline"
            >
              abcxxxxxx1@gmail.com
            </a>{" "}
            | Mumbai, Maharashtra
          </p>
          <p>
            LinkedIn - username | Github - username | Portfolio (if created)
          </p>
        </header>

        <section>
          <h2 className="text-xl font-bold border-b border-gray-300 pb-1 mb-2">
            SUMMARY
          </h2>
          <p>
            Enthusiastic Full Stack Developer, with a comprehensive knowledge in
            front-end technologies like HTML, CSS, JavaScript, and back-end
            technologies such as Python, Django and MySQL. Seeking to contribute
            to innovative projects, leveraging my skills to create impactful
            solutions that enhance user experiences and drive business growth.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold border-b border-gray-300 pb-1 mb-2">
            WORK EXPERIENCE
          </h2>

          <div className="mb-4">
            <h3 className="font-semibold">ABC ORG PVT. LTD.</h3>
            <p className="italic">
              Developer Intern/ Cloud Intern — Month 2024 – Month 2024
            </p>
            <ul className="list-disc list-inside">
              <li>
                Conducted data analysis and interpretation to derive actionable
                insights.
              </li>
              <li>
                Implemented machine learning algorithms for predictive modeling
                tasks.
              </li>
              <li>
                Contributed to the development of innovative data-driven
                solutions.
              </li>
              <li>
                Actively participated in team meetings and knowledge-sharing
                activities.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">ABC ORG PVT. LTD.</h3>
            <p className="italic">Designation — Month 2023 – Month 2023</p>
            <ul className="list-disc list-inside">
              <li>
                Completed a two-month internship focused on Python, MySQL, and
                Django.
              </li>
              <li>
                Managed personal and professional course particulars, leading to
                a 30% productivity increase.
              </li>
              <li>
                Implemented Intern Management System for 50 interns to track
                progress efficiently.
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold border-b border-gray-300 pb-1 mb-2">
            SKILLS
          </h2>
          <ul className="list-disc list-inside">
            <li>
              <strong>Programming Languages:</strong> Python, Java, .Net
            </li>
            <li>
              <strong>Web Technologies:</strong> HTML, CSS, JavaScript, React.js
            </li>
            <li>
              <strong>Database:</strong> MySQL
            </li>
            <li>
              <strong>Technologies:</strong> Machine Learning (ML), Artificial
              Intelligence (AI)
            </li>
            <li>
              <strong>Visualization Tools:</strong> Power BI, Tableau, MS Excel
            </li>
            <li>
              <strong>Other Skills:</strong> Add relevant soft skills if needed
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold border-b border-gray-300 pb-1 mb-2">
            PROJECTS
          </h2>
          <div className="mb-2">
            <h3 className="font-semibold">
              Flipkart Reviews Sentiment Analysis | Python
            </h3>
            <ul className="list-disc list-inside">
              <li>
                Conducted sentiment analysis on Flipkart product reviews using
                Python.
              </li>
              <li>Used NLP techniques to determine customer sentiment.</li>
              <li>Achieved 95% accuracy in classification.</li>
            </ul>
          </div>
          <p>
            Mention at least 3 projects in a similar manner with diverse skill
            sets (maximum 5)
          </p>
          <div className="text-blue-600 underline space-x-4">
            <a href="http://www.linkedin.com" target="_blank">
              LinkedIn
            </a>
            <a href="http://www.github.com" target="_blank">
              GitHub
            </a>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold border-b border-gray-300 pb-1 mb-2">
            COURSE
          </h2>
          <p>
            <strong>Masters in Data Software Engineering</strong> — Jan 2024 –
            Present
          </p>
          <p>IT Vedant Education Pvt. Ltd.</p>
          <p>
            <strong>Coursework:</strong> Machine Learning, Python, Power BI,
            Excel
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold border-b border-gray-300 pb-1 mb-2">
            EDUCATION
          </h2>
          <p>
            <strong>Bachelor’s of Engineering</strong> — 8.32 CGPA
          </p>
          <p>University of Mumbai, 2022</p>

          <p>
            <strong>HSC (12th)</strong> — 90%
          </p>
          <p>Maharashtra State Board, 2020</p>
        </section>

        <section>
          <h2 className="text-xl font-bold border-b border-gray-300 pb-1 mb-2">
            CERTIFICATIONS
          </h2>
          <ul className="list-disc list-inside">
            <li>Data Analysis with Python from IBM — Jan 2024</li>
            <li>SQL Certification from IT Vedant, Hyderabad — Dec 2023</li>
            <li>Add other relevant certifications</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold border-b border-gray-300 pb-1 mb-2">
            OTHER INFORMATION
          </h2>
          <p>Awards & Achievements / Volunteering Experience — Add if any</p>
        </section>
      </div>
    </>
  );
}

export default ResumeFormat;