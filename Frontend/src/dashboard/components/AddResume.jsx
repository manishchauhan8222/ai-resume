import { Loader2, PlusSquare } from "lucide-react";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

function AddResume({ onResumeCreated }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onCreate = () => {
    setLoading(true);
    const uuid = uuidv4();

    const newResume = {
      id: uuid,
      title: resumeTitle,
      sections: {},
    };

    const storedResumes = JSON.parse(localStorage.getItem("resumes")) || [];
    const updatedResumes = [...storedResumes, newResume];

    localStorage.setItem("resumes", JSON.stringify(updatedResumes));
    onResumeCreated(updatedResumes);

    setLoading(false);
    setOpenDialog(false);
    navigate(`/dashboard/resume/${uuid}/edit`);
  };

  return (
    <div>
      {/* Add Resume Card */}
      <div
        className="resume-list w-40 h-40 md:w-56 md:h-56 flex flex-col items-center justify-center border-2 border-dashed border-blue-400 rounded-xl bg-white hover:shadow-md cursor-pointer transition-all duration-300 ease-in-out"
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare className="w-10 h-10 text-blue-500 mb-2" />
        <p className="text-sm font-medium text-blue-600">New Resume</p>
      </div>

      {/* Dialog for creating resume */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <div className="mb-5 mt-2">
                <p className="text-gray-600">Add a title for your new resume</p>
                <Input
                  className="mt-2"
                  placeholder="Ex. Full Stack Developer Resume"
                  onChange={(e) => setResumeTitle(e.target.value)}
                  value={resumeTitle}
                />
              </div>
            </DialogDescription>
          </DialogHeader>

          <div className="flex gap-3 justify-end">
            <Button variant="ghost" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button
              disabled={!resumeTitle || loading}
              className="bg-blue-500 hover:bg-blue-600 text-white"
              onClick={onCreate}
            >
              {loading ? <Loader2 className="animate-spin" /> : "Create"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddResume;
