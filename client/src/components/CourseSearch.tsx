// // File: frontend/src/components/CourseSearch.tsx
// import React, { useState } from "react";

// const semesterSubjects: Record<string, string[]> = {
//   "Semester 1": ["Math 101", "English 101", "Physics 101"],
//   "Semester 2": ["Math 102", "Chemistry 101", "Biology 101"],
// };

// const courseOverviews: Record<string, string> = {
//   "Math 101":
//     "Math 101 is an introductory course covering fundamental mathematical concepts such as algebra, calculus, and geometry. Students will learn to solve equations, analyze functions, and apply mathematical reasoning to real-world problems.",
//   "English 101":
//     "English 101 focuses on developing academic writing and critical reading skills. The course helps students construct well-organized essays, understand rhetorical strategies, and improve grammar and clarity in written communication.",
//   "Physics 101":
//     "Physics 101 introduces the basic principles of physics including motion, energy, and forces. Through hands-on labs and theoretical exploration, students develop a foundation for understanding the physical world.",
//   "Math 102":
//     "Math 102 builds on Math 101 and introduces advanced topics such as integrals, differential equations, and sequences.",
//   "Chemistry 101":
//     "Chemistry 101 covers foundational concepts in chemistry including atoms, molecules, and chemical reactions.",
//   "Biology 101":
//     "Biology 101 provides an overview of cell structure, genetics, evolution, and ecology. It includes lab activities to understand basic biological principles.",
// };

// const CourseSearch: React.FC = () => {
//   const [selectedSemester, setSelectedSemester] = useState("");
//   const [selectedCourse, setSelectedCourse] = useState("");
//   const [overview, setOverview] = useState("");

//   const fetchOverview = () => {
//     const response = courseOverviews[selectedCourse];
//     setOverview(response || "No overview available for this course.");
//   };

//   const semesterOptions = Object.keys(semesterSubjects);
//   const courseOptions = selectedSemester
//     ? semesterSubjects[selectedSemester]
//     : [];

//   return (
//     <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
//       <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
//         Browse Course Overview by Semester
//       </h2>

//       <div className="flex flex-col gap-4 mb-4">
//         <select
//           value={selectedSemester}
//           onChange={(e) => {
//             setSelectedSemester(e.target.value);
//             setSelectedCourse("");
//             setOverview("");
//           }}
//           className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//         >
//           <option value="">Select a semester</option>
//           {semesterOptions.map((sem) => (
//             <option key={sem} value={sem}>
//               {sem}
//             </option>
//           ))}
//         </select>

//         <select
//           value={selectedCourse}
//           onChange={(e) => setSelectedCourse(e.target.value)}
//           className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//           disabled={!selectedSemester}
//         >
//           <option value="">Select a course</option>
//           {courseOptions.map((course) => (
//             <option key={course} value={course}>
//               {course}
//             </option>
//           ))}
//         </select>

//         <button
//           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//           onClick={fetchOverview}
//           disabled={!selectedCourse}
//         >
//           🔍 Search
//         </button>
//       </div>

//       {overview && (
//         <div className="mt-6 p-4 bg-white border-l-4 border-blue-600 rounded-md">
//           <h3 className="text-lg font-semibold text-gray-700 mb-2">
//             Course Overview
//           </h3>
//           <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">
//             {overview}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CourseSearch;

// File: frontend/src/components/CourseSearch.tsx
import React, { useState } from "react";

const semesterSubjects: Record<string, string[]> = {
  "Semester 1": ["Math 1101", "English 1101", "Physics 1101"],
  "Semester 2": ["Math 1201", "Chemistry 101", "Biology 101"],
};

const CourseSearch: React.FC = () => {
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [overview, setOverview] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchOverview = async () => {
    if (!selectedCourse) return;
    setLoading(true);
    setOverview("");
    try {
      const res = await fetch("http://localhost:3001/api/overview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ course: selectedCourse }),
      });
      const data = await res.json();
      setOverview(data.overview || "No overview available.");
    } catch {
      setOverview("Failed to fetch overview. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const semesterOptions = Object.keys(semesterSubjects);
  const courseOptions = selectedSemester
    ? semesterSubjects[selectedSemester]
    : [];

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Browse Course Overview by Semester
      </h2>

      <div className="flex flex-col gap-4 mb-4">
        <select
          value={selectedSemester}
          onChange={(e) => {
            setSelectedSemester(e.target.value);
            setSelectedCourse("");
            setOverview("");
          }}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select a semester</option>
          {semesterOptions.map((sem) => (
            <option key={sem} value={sem}>
              {sem}
            </option>
          ))}
        </select>

        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          disabled={!selectedSemester}
        >
          <option value="">Select a course</option>
          {courseOptions.map((course) => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
        </select>

        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
          onClick={fetchOverview}
          disabled={!selectedCourse || loading}
        >
          {loading ? "Loading..." : "🔍 Search"}
        </button>
      </div>

      {overview && (
        <div className="mt-6 p-4 bg-white border-l-4 border-blue-600 rounded-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Course Overview
          </h3>
          <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">
            {overview}
          </p>
        </div>
      )}
    </div>
  );
};

export default CourseSearch;
