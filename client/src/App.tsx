import React from "react";
import CourseSearch from "./components/CourseSearch";

const App: React.FC = () => {
  return (
    <div style={{ padding: 20 }}>
      <h1>Syllabus Search</h1>

      <hr />
      <CourseSearch />
    </div>
  );
};

export default App;
