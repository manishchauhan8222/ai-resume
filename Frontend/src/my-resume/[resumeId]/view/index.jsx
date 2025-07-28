import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import ResumePreview from "@/dashboard/resume/components/ResumePreview";
import React, { useEffect, useState } from "react";
import GlobalApi from "./../../../../service/GlobalApi";
import { useParams } from "react-router-dom";

function View() {
  const [resumeInfo, setResumeInfo] = useState(null);
  const { resumeId } = useParams();

  useEffect(() => {
    GetResumeInfo();
  }, []);

  const GetResumeInfo = async () => {
    try {
      console.log("Fetching resume for ID:", resumeId);
      const resp = await GlobalApi.GetResumeById(resumeId);
      console.log("API Response:", resp.data.data);
      setResumeInfo(resp.data.data);
    } catch (error) {
      console.error("Error fetching resume:", error);
    }
  };
  const handleDownload = () => {
    window.print();
  };
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Resume",
          text: "Check out my AI-generated resume!",
          url: window.location.href,
        });
        console.log("Shared successfully");
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      alert("Web Share API not supported in this browser.");
    }
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <Header />
        <div className="my-10 mx-10 md:mx-20 lg:mx-36">
          <h2 className="text-center text-2xl">
            Congrats! Your Ultimate AI Resume is ready!
          </h2>
          <p className="text-center text-gray-400">
            Now you can download or share your resume
          </p>
          <div className="flex justify-between my-10 gap-20">
            <Button className="btn" onClick={handleDownload}>
              Download
            </Button>

            <Button className="btn" onClick={handleShare}>
              Share
            </Button>
          </div>
        </div>
      </div>
      <div id="will-print" className="my-10 mx-10 md:mx-20 lg:mx-36">
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default View;
