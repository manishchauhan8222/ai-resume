import React from "react";

function SkillPreview({ resumeInfo }) {
  return (
    <div className="my-6">
      {/* Section Title */}
      <h2
        className="text-center font-bold text-lg mb-4"
        style={{ color: resumeInfo?.themeColor }}
      >
        Skills
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-3">
        {resumeInfo?.skills?.map((skill, index) => (
          <div
            key={index}
            className="flex justify-between items-center mb-2 w-full pr-4"
          >
            <span className="text-sm font-medium">{skill.name}</span>

            <div className="h-2 w-[120px] bg-gray-300 rounded overflow-hidden">
              <div
                className="h-2 rounded transition-all duration-500 ease-in-out"
                style={{
                  backgroundColor: resumeInfo?.themeColor,
                  width: `${(skill?.rate / 5) * 100}%`,
                  // 0–100% based on rating
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <hr
        className="border-b-[1.5px] my-4"
        style={{ borderColor: resumeInfo?.themeColor }}
      />
    </div>
  );
}

export default SkillPreview;
