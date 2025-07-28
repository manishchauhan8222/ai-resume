import React, { useContext, useEffect, useState } from "react";
import AddResume from "./components/AddResume";
import GlobalApi from "./../../service/GlobalApi";
import { useUser } from "@clerk/clerk-react";
import ResumeItem from "./components/ResumeItem";

function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);

  useEffect(() => {
    if (user) {
      GetResumeList();
    }
  }, [user]);

  const GetResumeList = () => {
    GlobalApi.GetUserResume(user?.primaryEmailAddress?.emailAddress)
      .then((res) => {
        console.log("API Response:", res.data);
        setResumeList(res.data?.data || []); // ✅ handle Strapi response
      })
      .catch((err) => console.error("Error fetching resumes:", err));
  };

  return (
    <div className="p-5 md:p-10 lg:px-32">
      {" "}
      {/* Adjusted padding for smaller screens */}
      <h2 className="font-bold text-2xl">My Resume</h2>
      <p>Start creating an AI resume for your next job role</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5">
        {" "}
        {/* Adjusted grid for smaller screens */}
        <AddResume />
        {resumeList.length > 0 &&
          resumeList.map((resume, index) => (
            <ResumeItem
              resume={resume}
              key={index}
              refreshData={GetResumeList}
            />
          ))}
      </div>
    </div>
  );
}

export default Dashboard;
