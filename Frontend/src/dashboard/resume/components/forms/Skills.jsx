import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

import {
  getResumeById,
  updateResume,
} from "../../../../../service/localStorageService";
function Skills({ goToPreview }) {
  const { resumeId } = useParams();

  const [skillList, setSkillList] = useState([{ name: "", rate: 0 }]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  const AddNewSkill = () => {
    setSkillList([...skillList, { name: "", rate: 0 }]);
  };

  const RemoveSkill = () => {
    if (skillList.length > 1) {
      setSkillList(skillList.slice(0, -1));
    }
  };

  const handleChange = (index, name, value) => {
    const newEntries = [...skillList];
    newEntries[index][name] = value;
    setSkillList(newEntries);
  };

  const onSave = () => {
    setLoading(true);
    try {
      const resume = getResumeById(resumeId);
      if (!resume) throw new Error("Resume not found");

      const updated = { ...resume, skills: skillList };
      updateResume(resumeId, updated);

      toast.success("Skills updated!");
      setResumeInfo(updated);

      if (goToPreview) {
        goToPreview();
      }
    } catch (error) {
      console.error("Save failed:", error);
      toast.error("Failed to update skills");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initialize skills from resume if available
    const resume = getResumeById(resumeId);
    if (resume?.skills) {
      setSkillList(resume.skills);
    }
  }, [resumeId]);

  useEffect(() => {
    setResumeInfo({ ...resumeInfo, skills: skillList });
  }, [skillList]);

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Skills</h2>
        <p>Add your professional skills and rating</p>
        <div className="space-y-4 mt-4">
          {skillList.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row justify-between items-center gap-3 border rounded-lg p-3"
            >
              <div className="w-full md:w-1/2">
                <label className="text-xs">Skill Name</label>
                <Input
                  value={item.name}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs">Rate:</span>
                <Rating
                  style={{ maxWidth: 150 }}
                  value={item.rate}
                  onChange={(v) => handleChange(index, "rate", v)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-5">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={AddNewSkill}
            className="text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
          >
            + Add More Skills
          </Button>
          <Button
            variant="outline"
            onClick={RemoveSkill}
            className="text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
          >
            - Remove
          </Button>
        </div>
        <Button disabled={loading} onClick={onSave} className="btn">
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default Skills;
