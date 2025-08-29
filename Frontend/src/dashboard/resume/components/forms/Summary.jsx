import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React, { useContext, useEffect, useState } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { toast } from "sonner";
import { updateResume } from "../../../../../service/localStorageService";

import { useParams } from "react-router-dom";
import { Brain, LoaderCircle } from "lucide-react";
import { AIChatSession } from "./../../../../../service/AIModal";

function Summary({ onNext }) {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState([]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const [summary, setSummary] = useState(resumeInfo?.summary || "");

  const prompt =
    "Job Title: {jobTitle}. Based on this job title, give me a list of summaries for 3 experience levels (Freshers, Mid-Level, Senior) in 3-4 lines each, in JSON array format with fields: summary and experience_level.";

  useEffect(() => {
    setResumeInfo((prev) => ({
      ...prev,
      summary: summary,
    }));
  }, [summary]);

  const GenerateSummaryFromAI = async () => {
    try {
      if (!resumeInfo?.jobTitle) {
        toast("Please enter a Job Title first!");
        return;
      }

      setLoading(true);
      const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle);
      console.log("Prompt:", PROMPT);

      const result = await AIChatSession.sendMessage(PROMPT);
      const responseText = await result.response.text();

      console.log("AI Raw Response:", responseText);

      let parsedData;
      try {
        parsedData = JSON.parse(responseText);
      } catch (error) {
        toast.error("Failed to parse AI response");
        console.error("JSON Parse Error:", error);
        return;
      }

      setAiGeneratedSummaryList(parsedData);
    } catch (error) {
      console.error("AI generation failed:", error);
      toast.error("Failed to generate summary");
    } finally {
      setLoading(false);
    }
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        data: {
          summary: summary,
        },
      };
      await updateResume(params?.resumeId, data.data);
      toast.success("Summary saved successfully");
      if (onNext) onNext();
    } catch (error) {
      console.error("Error saving summary:", error);
      toast.error("Failed to save summary");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Summary</h2>
      <p>Add a summary for your job title</p>

      <form onSubmit={onSave}>
        <div className="mt-7">
          <div className="flex justify-between items-end">
            <label>Add Summary</label>
            <Button
              variant="outline"
              size="sm"
              type="button"
              className="text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
              onClick={GenerateSummaryFromAI}
              disabled={loading}
            >
              {loading ? <LoaderCircle className="animate-spin" /> : <Brain />}
              Generate from AI
            </Button>
          </div>
          <Textarea
            className="mt-5"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Write or select a summary..."
          />
        </div>
        <div className="mt-7 flex justify-end">
          <Button className="btn" type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>

      {/* AI Suggestions */}
      {aiGeneratedSummaryList.length > 0 && (
        <div className="mt-6">
          <h2 className="font-semibold text-medium mb-2">AI Suggestions:</h2>
          <div className="space-y-3">
            {aiGeneratedSummaryList.map((item, index) => (
              <div
                key={index}
                onClick={() => setSummary(item.summary)}
                className="cursor-pointer border p-3 rounded-md hover:bg-gray-100"
              >
                <h3 className="font-semibold">
                  Level: {item.experience_level}
                </h3>
                <p>{item.summary}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Summary;
