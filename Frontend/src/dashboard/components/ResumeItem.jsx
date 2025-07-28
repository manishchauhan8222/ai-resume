import {
  Delete as DeleteIcon,
  Download,
  Edit,
  MoreVertical,
  Notebook,
  Eye,
  Loader2Icon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import GlobalApi from "./../../../service/GlobalApi";
import { toast } from "sonner";

function ResumeItem({ resume, refreshData }) {
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const openResume = () => {
    navigate("/dashboard/resume/" + resume.documentId + "/edit");
  };

  const viewResume = () => {
    navigate(`/my-resume/${resume.documentId}/view`);
  };

  const downloadResume = () => {
    // Navigate to view page and trigger print
    navigate(`/my-resume/${resume.documentId}/view`, {
      state: { download: true },
    });
  };

  return (
    <div className="relative">
      <div className="resume-list w-56 h-56 flex flex-col border rounded-xl bg-white hover:shadow-lg transition-all duration-300 ease-in-out">
        {/* Top Icon */}
        <div className="flex justify-center items-center mt-6">
          <Notebook size={56} className="text-blue-500" />
        </div>

        {/* Bottom title and dropdown */}
        <div className="  bg-blue-500 text-white flex justify-between items-center px-4 py-2 rounded-b-lg w-full mt-auto">
          <h2 className="text-sm font-semibold truncate max-w-[120px]">
            {resume.title}
          </h2>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1 rounded-full hover:bg-blue-600 transition">
                <MoreVertical className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 bg-white shadow-lg rounded-lg p-1">
              <DropdownMenuItem
                onClick={openResume}
                className="flex items-center gap-2 hover:bg-gray-100 rounded-md px-2"
              >
                <Edit size={16} /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={viewResume}
                className="flex items-center gap-2 hover:bg-gray-100 rounded-md px-2"
              >
                <Eye size={16} /> View
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={downloadResume}
                className="flex items-center gap-2 hover:bg-gray-100 rounded-md px-2"
              >
                <Download size={16} /> Download
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2 text-red-500 hover:bg-red-50 rounded-md px-2"
                onClick={() => setOpenAlert(true)}
              >
                <DeleteIcon size={16} /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Delete Confirmation Dialog */}
          <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your resume and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  disabled={loading}
                  onClick={() => {
                    setLoading(false);
                    setOpenAlert(false);
                  }}
                >
                  Cancel
                </AlertDialogCancel>

                {/* Custom delete button */}
                <button
                  type="button"
                  onClick={async () => {
                    setLoading(true);
                    try {
                      await GlobalApi.DeleteResumeById(resume.documentId);
                      toast.success("Resume Deleted!");
                      refreshData();
                      setOpenAlert(false); // ✅ Close ONLY after delete is done
                    } catch (error) {
                      toast.error("Failed to delete resume");
                    } finally {
                      setLoading(false);
                    }
                  }}
                  disabled={loading}
                  className="bg-red-600 text-white rounded-md px-4 py-2 flex items-center gap-2 hover:bg-red-700"
                >
                  {loading ? (
                    <Loader2Icon className="animate-spin" />
                  ) : (
                    <>
                      <DeleteIcon size={16} /> Delete
                    </>
                  )}
                </button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}

export default ResumeItem;
