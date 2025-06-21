import React, { useEffect, useRef, useState } from "react";

const semesterSubjects: Record<string, string[]> = {
  "Semester 1": ["Math 101", "English 101", "Physics 101"],
  "Semester 2": ["Math 102", "Chemistry 101", "Biology 101"],
};

const CourseSearch: React.FC = () => {
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [overview, setOverview] = useState("");
  const [loading, setLoading] = useState(false);
  const [animatedText, setAnimatedText] = useState("");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchOverview = async () => {
    if (!selectedCourse) return;
    setLoading(true);
    setOverview("");
    setAnimatedText("");
    try {
      const res = await fetch("http://localhost:3001/api/overview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ course: selectedCourse }),
      });
      const data = await res.json();
      let text = data.overview?.toString().trim() || "No overview available.";

      // Truncate the text after the last full sentence ending with a period
      const lastPeriodIndex = text.lastIndexOf(".");
      if (lastPeriodIndex !== -1) {
        text = text.slice(0, lastPeriodIndex + 1);
      }

      setOverview(text);
    } catch {
      setOverview("Failed to fetch overview. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading && overview) {
      setAnimatedText("");
      let index = 0;
      intervalRef.current = setInterval(() => {
        if (index < overview.length) {
          const char = overview.charAt(index);
          setAnimatedText((prev) => prev + char);
          index++;
        } else {
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
      }, 20);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [overview, loading]);

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
            setAnimatedText("");
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

      {loading && (
        <div className="mt-6 p-4 bg-white border-l-4 border-blue-600 rounded-md animate-pulse">
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>
      )}

      {animatedText && !loading && (
        <div className="mt-6 p-4 bg-white border-l-4 border-blue-600 rounded-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Course Overview
          </h3>
          <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">
            {animatedText}
          </p>
        </div>
      )}
    </div>
  );
};

export default CourseSearch;
