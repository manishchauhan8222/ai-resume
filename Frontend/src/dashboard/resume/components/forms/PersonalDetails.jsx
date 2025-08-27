import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateResume } from "../../../../../service/localStorageService";
import { toast } from "sonner";

function PersonalDetail({ onNext }) {
  const params = useParams();
  const navigate = useNavigate();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const [formData, setFormData] = useState(resumeInfo || {}); // ✅ initialize properly
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resumeInfo) setFormData(resumeInfo); // ✅ load context data into form
  }, [resumeInfo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setResumeInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateResume(params?.resumeId, formData);
      toast.success("Details updated ✅");

      setLoading(false);

      if (onNext) {
        onNext();
      } else {
        navigate(`/dashboard/resume/${params?.resumeId}/edit`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to save ❌");
      setLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Detail</h2>
      <p>Get started with the basic information</p>

      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label className="text-sm">First Name</label>
            <Input
              name="firstName"
              value={formData.firstName || ""}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Last Name</label>
            <Input
              name="lastName"
              value={formData.lastName || ""}
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Job Title</label>
            <Input
              name="jobTitle"
              value={formData.jobTitle || ""}
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <Input
              name="address"
              value={formData.address || ""}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Phone</label>
            <Input
              name="phone"
              value={formData.phone || ""}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <Input
              name="email"
              value={formData.email || ""}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Linkedin</label>
            <Input
              name="linkedin"
              value={formData.linkedin || ""}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Github</label>
            <Input
              name="github"
              value={formData.github || ""}
              required
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <Button className="btn bg-blue-500" type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetail;
