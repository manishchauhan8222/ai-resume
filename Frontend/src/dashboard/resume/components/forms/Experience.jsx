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
  const [experinceList, setExperinceList] = useState([]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [loading, setLoading] = useState(false);

  // ✅ Load data from context when component mounts
  useEffect(() => {
    if (resumeInfo?.experience?.length > 0) {
      setExperinceList(resumeInfo.experience);
    }
  }, [resumeInfo]);

  // ✅ Update context whenever experience list changes
  useEffect(() => {
    setResumeInfo((prev) => ({
      ...prev,
      experience: experinceList,
    }));
  }, [experinceList]);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newEntries = [...experinceList];
    newEntries[index][name] = value;
    setExperinceList(newEntries);
  };

  const handleRichTextEditor = (e, name, index) => {
    const newEntries = [...experinceList];
    newEntries[index][name] = e.target.value;
    setExperinceList(newEntries);
  };

  const AddNewExperience = () => {
    setExperinceList([...experinceList, { ...emptyExperience }]);
  };

  const RemoveExperience = () => {
    if (experinceList.length > 0) {
      setExperinceList(experinceList.slice(0, -1));
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const onSave = async () => {
    setLoading(true);
    const data = {
      data: {
        experience: experinceList.map((item) => ({
          position: item.position,
          companyName: item.companyName,
          city: item.city,
          state: item.state,
          startDate: item.startDate,
          endDate:
            item.endDate && item.endDate.trim() !== ""
              ? item.endDate
              : "Present",
          workSummary: item.workSummary,
        })),
      },
    };

    try {
      const res = await updateResume(params?.resumeId, data.data);
      console.log("Saved:", res);
      toast.success("Details updated!");
      if (onNext) onNext();
    } catch (error) {
      console.error("Save failed:", error);
      toast.error("Failed to update details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Professional Experience</h2>
        <p>Add Your previous Job experience</p>
        <div>
          {experinceList.map((item, index) => (
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
        <div className="">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={AddNewExperience}
              className="text-blue-500 cursor-pointer border-blue-500 hover:bg-blue-500 hover:text-white"
            >
              + Add More
            </Button>
            <Button
              variant="outline"
              onClick={RemoveExperience}
              className="text-blue-500 cursor-pointer border-blue-500 hover:bg-blue-500 hover:text-white"
            >
              - Remove
            </Button>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button disabled={loading} onClick={onSave} className=" btn">
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Experience;
