import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import RichTextEditor from "../RichTextEditor";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import { updateResume } from "../../../../../service/localStorageService";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

const emptyExperience = {
  position: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummary: "",
};

function Experience({ onNext, activeFormIndex }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [loading, setLoading] = useState(false);

  // ✅ Initialize state without double overwrite
  const [experienceList, setExperienceList] = useState(
    resumeInfo?.experience?.length > 0
      ? resumeInfo.experience
      : [{ ...emptyExperience }]
  );

  // ✅ Keep context in sync
  useEffect(() => {
    setResumeInfo((prev) => ({
      ...prev,
      experience: experienceList,
    }));
  }, [experienceList]);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    setExperienceList((prev) =>
      prev.map((exp, i) => (i === index ? { ...exp, [name]: value } : exp))
    );
  };

  const handleRichTextEditor = (e, name, index) => {
    const { value } = e.target;
    setExperienceList((prev) =>
      prev.map((exp, i) => (i === index ? { ...exp, [name]: value } : exp))
    );
  };

  const AddNewExperience = () => {
    setExperienceList((prev) => [...prev, { ...emptyExperience }]);
  };

  const RemoveExperience = () => {
    setExperienceList((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  const onSave = async () => {
    if (
      experienceList.every(
        (item) =>
          !item.position &&
          !item.companyName &&
          !item.city &&
          !item.state &&
          !item.startDate &&
          !item.endDate &&
          !item.workSummary
      )
    ) {
      toast.error(
        "Please add at least one valid experience entry before saving."
      );
      return;
    }

    setLoading(true);
    const data = {
      experience: experienceList.map((item) => ({
        ...item,
        endDate:
          item.endDate && item.endDate.trim() !== "" ? item.endDate : "Present",
      })),
    };

    try {
      await updateResume(params?.resumeId, data);
      toast.success("Experience details updated!");
      if (onNext) onNext();
    } catch (error) {
      console.error("Save failed:", error);
      toast.error("Failed to update experience details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Professional Experience</h2>
        <p>Add your previous job experience</p>

        <div>
          {experienceList.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg"
            >
              <div>
                <label className="text-xs">Position Title</label>
                <Input
                  name="position"
                  value={item.position}
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
              <div>
                <label className="text-xs">Company Name</label>
                <Input
                  name="companyName"
                  value={item.companyName}
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
              <div>
                <label className="text-xs">City</label>
                <Input
                  name="city"
                  value={item.city}
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
              <div>
                <label className="text-xs">State</label>
                <Input
                  name="state"
                  value={item.state}
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
              <div>
                <label className="text-xs">Start Date</label>
                <Input
                  type="date"
                  name="startDate"
                  value={item.startDate}
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
              <div>
                <label className="text-xs">End Date</label>
                <Input
                  type="date"
                  name="endDate"
                  value={item.endDate}
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
              <div className="col-span-2">
                <RichTextEditor
                  index={index}
                  defaultValue={item.workSummary}
                  activeFormIndex={activeFormIndex}
                  onRichTextEditorChange={(event) =>
                    handleRichTextEditor(event, "workSummary", index)
                  }
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={AddNewExperience}
            className="text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
          >
            + Add More
          </Button>
          <Button
            variant="outline"
            onClick={RemoveExperience}
            className="text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
          >
            - Remove
          </Button>
        </div>

        <div className="flex justify-end mt-4">
          <Button disabled={loading} onClick={onSave} className="btn">
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Experience;
