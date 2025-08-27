import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext } from "react";
import PersonalDetailsPreview from "./preview/PersonalDetailsPreview";
import SummaryPreview from "./preview/SummaryPreview";
import ExperiencePreview from "./preview/ExperiencePreview";
import EducationalPreview from "./preview/EducationalPreview";
import SkillPreview from "./preview/SkillPreview";

function ResumePreview() {
  const { resumeInfo } = useContext(ResumeInfoContext);
  return (
    <div
      className="shadow-lg h-full p-6 md:p-14 border-t-[20px] rounded-md" // Adjusted padding
      style={{
        borderColor: resumeInfo?.themeColor,
      }}
    >
      {/* Personal Details */}
      <PersonalDetailsPreview resumeInfo={resumeInfo}></PersonalDetailsPreview>
      {/* Summary */}
      <SummaryPreview resumeInfo={resumeInfo}></SummaryPreview>
      {/* Professional Experience */}
      <ExperiencePreview resumeInfo={resumeInfo}></ExperiencePreview>
      {/* Educational */}
      <EducationalPreview resumeInfo={resumeInfo}></EducationalPreview>
      {/* Skills */}
      <SkillPreview resumeInfo={resumeInfo}></SkillPreview>
    </div>
  );
}

export default ResumePreview;
