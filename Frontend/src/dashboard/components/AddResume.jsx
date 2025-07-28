import { Loader2, PlusSquare } from "lucide-react";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/clerk-react";
import GlobalApi from "./../../../service/GlobalApi";
import { useNavigate } from "react-router-dom";
function AddResume() {
  const [opendailog, setOpenDailog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState();
  const [loading, setLoading] = useState(false);
  const navigatation = useNavigate();

  const { user } = useUser();
  const onCreate = () => {
    setLoading(true);
    const uuid = uuidv4();
    const data = {
      data: {
        title: resumeTitle,
        resumeId: uuid,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
      },
    };
    GlobalApi.CreateNewResume(data)
      .then((res) => {
        console.log(res.data.data.documentId);
        if (res) {
          setLoading(false);
          navigatation(`/dashboard/resume/${res.data.data.documentId}/edit`);
        }
      })
      .catch((err) => {
        console.error("Error:", err?.response?.data || err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="">
      <div className=" resume-list" onClick={() => setOpenDailog(true)}>
        <PlusSquare></PlusSquare>
      </div>
      <Dialog open={opendailog} onOpenChange={setOpenDailog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <div className="mb-5 mt-2">
                <p>Add a title of your new resume</p>
                <Input
                  className="mt-2"
                  placeholder="Ex. Full Stack resume"
                  onChange={(e) => setResumeTitle(e.target.value)}
                />
              </div>
            </DialogDescription>

            <div className="flex gap-5 justify-end">
              <Button
                variant="Ghost"
                className=""
                onClick={() => {
                  setOpenDailog(false);
                }}
              >
                Cancel
              </Button>
              <Button
                disabled={!resumeTitle || loading}
                className="bg-blue-500"
                onClick={() => onCreate()}
              >
                {loading ? (
                  <Loader2 className="animate-spin"></Loader2>
                ) : (
                  "Create"
                )}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddResume;
