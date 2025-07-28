import React from "react";

function EducationalPreview({ resumeInfo }) {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-lg mb-2"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        Educational Details
      </h2>
      {resumeInfo?.education?.map((edu, index) => (
        <div key={index} className="mb-4">
          <div className="flex justify-between">
            <h3 className="font-semibold text-medium">{edu.universityName}</h3>
            <span className="text-sm text-gray-500">
              {edu.eduCity},{edu.eduState}
            </span>
          </div>

          <h3 className="text-sm ml-3">{edu.degree}</h3>
          <span className="text-s text-gray-500">
            {edu.startDate} To {edu.currentlyStudying ? "Present" : edu.endDate}
          </span>

          <div
            className="text-sm my-2"
            dangerouslySetInnerHTML={{ __html: edu?.description }}
          ></div>
        </div>
      ))}
      <hr
        className="border-b-[1.5px] my-4"
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      ></hr>
    </div>
  );
}

export default EducationalPreview;
