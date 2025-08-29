import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import RichTextEditor from "../RichTextEditor";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import { updateResume } from "../../../../../service/localStorageService";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

const emptyEducation = {
  universityName: "",

  startDate: "",
  endDate: "",
  eduCity: "",
  eduState: "",
  degree: "",
  description: "",
};

function Education({ onNext, activeFormIndex }) {
  const [educationList, setEducationList] = useState([]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [loading, setLoading] = useState(false);

  // ✅ Load data from context when component mounts
  useEffect(() => {
    if (resumeInfo?.education?.length > 0) {
      setEducationList(resumeInfo.education);
    }
  }, [resumeInfo]);

  // ✅ Update context whenever education list changes
  useEffect(() => {
    setResumeInfo((prev) => ({
      ...prev,
      education: educationList,
    }));
  }, [educationList]);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newEntries = [...educationList];
    newEntries[index][name] = value;
    setEducationList(newEntries);
  };
  const handleRichTextEditor = (e, name, index) => {
    const newEntries = [...educationList];
    newEntries[index][name] = e.target.value;
    setEducationList(newEntries);
  };
  const AddNewEducation = () => {
    setEducationList([...educationList, { ...emptyEducation }]);
  };

  const RemoveEducation = () => {
    if (educationList.length > 0) {
      setEducationList(educationList.slice(0, -1));
    }
  };

  const onSave = async () => {
    setLoading(true);
    const data = {
      data: {
        education: educationList.map((item) => ({
          universityName: item.universityName,
          startDate: item.startDate,
          endDate:
            item.endDate && item.endDate.trim() !== ""
              ? item.endDate
              : "Present",
          eduCity: item.eduCity,
          eduState: item.eduState,
          degree: item.degree,
          description: item.description,
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Education Details</h2>
        <p>Add Your Education Details</p>
        <div>
          {educationList.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg"
            >
              <div>
                <label className="text-xs">University Name</label>
                <Input
                  name="universityName"
                  value={item.universityName}
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
              <div>
                <label className="text-xs">Degree</label>
                <Input
                  name="degree"
                  value={item.degree}
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
              <div>
                <label className="text-xs">City</label>
                <Input
                  name="eduCity"
                  value={item.eduCity}
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
              <div>
                <label className="text-xs">State</label>
                <Input
                  name="eduState"
                  value={item.eduState}
                  onChange={(event) => handleChange(index, event)}
                />
              </div>

              <div className="col-span-2">
                <RichTextEditor
                  index={index}
                  defaultValue={item.description}
                  activeFormIndex={activeFormIndex}
                  onRichTextEditorChange={(event) =>
                    handleRichTextEditor(event, "description", index)
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
              onClick={AddNewEducation}
              className="text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
            >
              + Add More
            </Button>
            <Button
              variant="outline"
              onClick={RemoveEducation}
              className="text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
            >
              - Remove
            </Button>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          {" "}
          <Button disabled={loading} onClick={onSave} className=" btn">
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Education;
