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
  degree: "",
  startDate: "",
  endDate: "",
  eduCity: "",
  eduState: "",
  description: "",
};

function Education({ onNext, activeFormIndex }) {
  const [educationList, setEducationList] = useState([]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [loading, setLoading] = useState(false);

  // ✅ Load from context or start with one blank form
  useEffect(() => {
    if (resumeInfo?.education?.length > 0) {
      setEducationList(resumeInfo.education);
    } else {
      setEducationList([{ ...emptyEducation }]);
    }
  }, [resumeInfo]);

  // ✅ Sync with context
  useEffect(() => {
    setResumeInfo((prev) => ({
      ...prev,
      education: educationList,
    }));
  }, [educationList]);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    setEducationList((prev) =>
      prev.map((edu, i) => (i === index ? { ...edu, [name]: value } : edu))
    );
  };

  const handleRichTextEditor = (e, name, index) => {
    const { value } = e.target;
    setEducationList((prev) =>
      prev.map((edu, i) => (i === index ? { ...edu, [name]: value } : edu))
    );
  };

  const AddNewEducation = () => {
    setEducationList((prev) => [...prev, { ...emptyEducation }]);
  };

  const RemoveEducation = () => {
    setEducationList((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  const onSave = async () => {
    // ✅ validation: require at least one filled form
    if (
      educationList.length === 0 ||
      educationList.every(
        (item) =>
          !item.universityName &&
          !item.degree &&
          !item.eduCity &&
          !item.eduState &&
          !item.startDate &&
          !item.endDate &&
          !item.description
      )
    ) {
      toast.error(
        "Please add at least one valid education entry before saving."
      );
      return;
    }

    setLoading(true);
    const data = {
      education: educationList.map((item) => ({
        universityName: item.universityName,
        degree: item.degree,
        startDate: item.startDate,
        endDate:
          item.endDate && item.endDate.trim() !== "" ? item.endDate : "Present",
        eduCity: item.eduCity,
        eduState: item.eduState,
        description: item.description,
      })),
    };

    try {
      const res = await updateResume(params?.resumeId, data);
      console.log("Saved:", res);
      toast.success("Education details updated!");
      if (onNext) onNext();
    } catch (error) {
      console.error("Save failed:", error);
      toast.error("Failed to update education details");
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
        <p>Add your education details</p>

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

        <div className="flex justify-end mt-4">
          <Button disabled={loading} onClick={onSave} className="btn">
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Education;
