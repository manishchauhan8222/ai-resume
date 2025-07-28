import React from "react";

function SummaryPreview({ resumeInfo }) {
  return (
    <div>
      <h2
        className="text-center font-bold text-lg mb-2"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        Summary
      </h2>
      <p className="text-sm">{resumeInfo?.summary}</p>
      <hr
        className="border-b-[1.5px] my-4"
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      ></hr>
    </div>
  );
}

export default SummaryPreview;
