import React from "react";

type Props = {
  selected: string;
  onChange: (value: string) => void;
  semesters: string[];
};

const SemesterSelector: React.FC<Props> = ({
  selected,
  onChange,
  semesters,
}) => {
  return (
    <select value={selected} onChange={(e) => onChange(e.target.value)}>
      <option value="">Select a Semester</option>
      {semesters.map((sem) => (
        <option key={sem} value={sem}>
          {sem}
        </option>
      ))}
    </select>
  );
};

export default SemesterSelector;
