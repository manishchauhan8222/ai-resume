import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormSection from "../../components/FormSection";
import ResumePreview from "../../components/ResumePreview";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import dummy from "@/data/dummy";
import GlobalApi from "./../../../../../service/GlobalApi";

function EditResume() {
  const { resumeId } = useParams();
  const [resumeInfo, setResumeInfo] = useState(dummy);

  useEffect(() => {
    GetResumeInfo();
  }, []);

  const GetResumeInfo = async () => {
    try {
      const resp = await GlobalApi.GetResumeById(resumeId);
      const apiData = resp.data?.data || {};

      // ✅ Deep merge with fallbacks for all sections
      const mergedData = {
        ...dummy,
        ...apiData,
        // Merge Personal Details
        firstName: apiData.firstName || dummy.firstName,
        lastName: apiData.lastName || dummy.lastName,
        email: apiData.email || dummy.email,
        phone: apiData.phone || dummy.phone,
        address: apiData.address || dummy.address,
        jobTitle: apiData.jobTitle || dummy.jobTitle,

        // Merge Summary
        summary: apiData.summary || dummy.summary,

        // Merge Experience
        experience: apiData.experience?.length
          ? apiData.experience
          : dummy.experience,

        // Merge Education
        education: apiData.education?.length
          ? apiData.education
          : dummy.education,

        // Merge Skills
        skills: apiData.skills?.length ? apiData.skills : dummy.skills,

        // Merge Theme
        themeColor: apiData.themeColor || dummy.themeColor,
      };

      setResumeInfo(mergedData);
    } catch (error) {
      console.error("Error fetching resume:", error);
      setResumeInfo(dummy);
    }
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
        {/* Form Section */}
        <FormSection />
        {/* Preview Section */}
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default EditResume;
