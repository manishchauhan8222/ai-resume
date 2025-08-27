import React, { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import AddResume from "./components/AddResume";
import ResumeItem from "./components/ResumeItem";

function Dashboard() {
  const [resumes, setResumes] = useState([]);

  // Load resumes from localStorage
  const loadResumes = () => {
    const storedResumes = JSON.parse(localStorage.getItem("resumes")) || [];
    setResumes(storedResumes);
  };

  useEffect(() => {
    loadResumes();
  }, []);

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex flex-col md:flex-row  items-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">My Resumes</h1>
      </div>

      {/* Empty State */}
      {resumes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl shadow-sm">
          <FileText className="w-16 h-16 text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">
            No resumes yet
          </h2>
          <p className="text-gray-500 mb-6">
            Start building your first AI-powered resume now.
          </p>
          <AddResume onResumeCreated={setResumes} />
        </div>
      ) : (
        /* Resume Cards Grid */
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <AddResume onResumeCreated={setResumes} />
          {resumes.map((resume) => (
            <ResumeItem
              key={resume.id}
              resume={resume}
              refreshData={loadResumes}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
