import React from "react";

type Props = {
  subjects: string[];
};

const SubjectList: React.FC<Props> = ({ subjects }) => {
  return (
    <ul>
      {subjects.map((subject) => (
        <li key={subject}>{subject}</li>
      ))}
    </ul>
  );
};

export default SubjectList;
