import React from "react";

function ExperiencePreview({ resumeInfo }) {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-lg mb-2"
        style={{ color: resumeInfo?.themeColor }}
      >
        Professional Experience
      </h2>
      {resumeInfo?.experience?.map((exp, index) => (
        <div key={index} className="mb-4">
          <div className="flex justify-between">
            <h3 className="font-semibold text-medium">
              {exp.position} - {exp.companyName}
            </h3>
            <span className="text-sm text-gray-500">
              {exp.city}, {exp.state}
            </span>
          </div>
          <p className="text-sm text-gray-500">
            {exp.startDate} To {exp.endDate ? exp.endDate : "Present"}
          </p>
          <div
            className="text-sm my-2"
            dangerouslySetInnerHTML={{ __html: exp?.workSummary }}
          />
        </div>
      ))}
      <hr
        className="border-b-[1.5px] my-4"
        style={{ borderColor: resumeInfo?.themeColor }}
      />
    </div>
  );
}

export default ExperiencePreview;
