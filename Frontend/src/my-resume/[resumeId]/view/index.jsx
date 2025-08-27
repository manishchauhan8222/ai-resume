import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import ResumePreview from "@/dashboard/resume/components/ResumePreview";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getResumeById } from "../../../../service/localStorageService";

function View() {
  const [resumeInfo, setResumeInfo] = useState(null);
  const { resumeId } = useParams();

  useEffect(() => {
    const resume = getResumeById(resumeId);
    setResumeInfo(resume || null);
  }, [resumeId]);

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
        <div className="my-10 mx-auto max-w-4xl px-6 text-center">
          {/* Congrats message */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl md:text-3xl font-bold">
              🎉 Congrats! Your Ultimate AI Resume is Ready!
            </h2>
            <p className="mt-2 text-blue-100 text-lg">
              You can now <span className="font-semibold">download</span> or{" "}
              <span className="font-semibold">share</span> your professionally
              crafted resume.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              <Button
                onClick={handleDownload}
                className="px-6 py-3 rounded-xl text-lg font-medium shadow-md hover:shadow-xl bg-white text-blue-600 hover:bg-blue-50"
              >
                ⬇️ Download
              </Button>
              <Button
                onClick={handleShare}
                className="px-6 py-3 rounded-xl text-lg font-medium shadow-md hover:shadow-xl bg-white text-blue-600 hover:bg-blue-50"
              >
                🚀 Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Preview Section */}
      <div
        id="will-print"
        className="my-12 mx-auto max-w-4xl bg-white shadow-lg rounded-xl p-6 border"
      >
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default View;
