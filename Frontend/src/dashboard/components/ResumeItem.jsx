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

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { deleteResume } from "../../../service/localStorageService";

function ResumeItem({ resume, refreshData }) {
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const openResume = () => {
    navigate("/dashboard/resume/" + resume.id + "/edit");
  };

  const viewResume = () => {
    navigate(`/my-resume/${resume.id}/view`);
  };

  const downloadResume = () => {
    navigate(`/my-resume/${resume.id}/view`, {
      state: { download: true },
    });
  };

  const handleDelete = () => {
    setLoading(true);
    try {
      deleteResume(resume.id);
      toast.success("Resume Deleted!");
      refreshData();
      setOpenAlert(false);
    } catch {
      toast.error("Failed to delete resume");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div className="resume-list aspect-square w-32 sm:w-40 md:w-48 lg:w-56 flex flex-col border rounded-xl bg-white hover:shadow-md transition-all duration-300 ease-in-out">
        {/* Icon */}
        <div className="flex justify-center items-center flex-1">
          <Notebook size={48} className="text-blue-500" />
        </div>

        {/* Title + Actions */}
        <div className="bg-blue-500 text-white flex justify-between items-center px-3 py-2 rounded-b-xl w-full">
          <h2 className="text-xs md:text-sm font-medium truncate max-w-[80px] md:max-w-[120px]">
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
                className="flex items-center gap-2 cursor-pointer"
              >
                <Edit size={16} /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={viewResume}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Eye size={16} /> View
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={downloadResume}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Download size={16} /> Download
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2 text-red-500 hover:bg-red-50 rounded-md px-2 cursor-pointer"
                onClick={() => setOpenAlert(true)}
              >
                <DeleteIcon size={16} /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Delete Confirmation */}
      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete your resume.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
            <button
              type="button"
              onClick={handleDelete}
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
  );
}

export default ResumeItem;
