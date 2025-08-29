import React from "react";

function PersonalDetailsPreview({ resumeInfo }) {
  return (
    <div>
      <h2
        className="font-bold text-xl text-center"
        style={{ color: resumeInfo?.themeColor }}
      >
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h2>
      <h2
        className="text-center font-medium text-sm"
        style={{ color: resumeInfo?.themeColor1 }}
      >
        {resumeInfo?.jobTitle}
      </h2>
      <h2 className="text-center text-sm font-medium">{resumeInfo?.address}</h2>

      <h2 className="font-normal text-sm">Email : {resumeInfo?.email}</h2>
      <h2 className="font-normal text-sm">Phone : {resumeInfo?.phone}</h2>

      <h2 className="font-normal text-sm">Linkedin : {resumeInfo?.linkedin}</h2>
      <h2 className="font-normal text-sm">Github : {resumeInfo?.github}</h2>
      <hr
        className="border-b-[1.5px] my-4"
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      ></hr>
    </div>
  );
}

export default PersonalDetailsPreview;
