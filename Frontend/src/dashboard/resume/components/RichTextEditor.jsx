import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Brain, LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { AIChatSession } from "./../../../../service/AIModal";
import { toast } from "sonner";

const EXPERIENCE_PROMPT = `
Position Title: {positionTitle}.
Write a professional summary for this role in 4-5 sentences suitable for a resume. 
Keep it concise, formal, and avoid bullet points or HTML. Only return plain text.
`;

const DEGREE_PROMPT = `
Degree: {degreeName}.
Write a short 3-4 line academic summary that highlights this degree and its importance for a professional resume.
`;

const SKILLS_PROMPT = `
Job Title: {jobTitle}.
Provide a concise 4-5 sentence summary describing core skills and expertise related to this job title for a resume.
`;

function RichTextEditor({
  onRichTextEditorChange,
  index,
  defaultValue,
  activeFormIndex,
}) {
  const [value, setValue] = useState(defaultValue || "");
  const { resumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  // Sync default value when prop changes
  useEffect(() => {
    setValue(defaultValue || "");
  }, [defaultValue]);

  // Generic function to call AI and clean response
  const generateAIText = async (prompt) => {
    try {
      setLoading(true);
      const result = await AIChatSession.sendMessage(prompt);
      const responseText = await result.response.text();
      let cleanText = responseText;

      // Try parsing JSON to extract useful text
      try {
        const parsed = JSON.parse(responseText);
        if (parsed.professional_summary) {
          cleanText = parsed.professional_summary;
        } else if (parsed.summary) {
          cleanText = parsed.summary;
        } else {
          // If keys are unknown, take first value
          const firstKey = Object.keys(parsed)[0];
          cleanText = parsed[firstKey] || responseText;
        }
      } catch {
        // If it's plain text, just use it
        cleanText = responseText;
      }

      setValue(cleanText);
      onRichTextEditorChange({ target: { value: cleanText } });
    } catch (error) {
      console.error("AI generation failed:", error);
      toast.error("Failed to generate summary");
    } finally {
      setLoading(false);
    }
  };

  // AI Generate Functions
  const GenerateSummaryFromAI = async () => {
    if (!resumeInfo?.experience[index]?.position) {
      toast("Please Add Position Title");
      return;
    }
    await generateAIText(
      EXPERIENCE_PROMPT.replace(
        "{positionTitle}",
        resumeInfo.experience[index].position
      )
    );
  };

  const GenerateDegreeSummaryFromAI = async () => {
    if (!resumeInfo?.education[index]?.degree) {
      toast("Please Add Degree Name");
      return;
    }
    await generateAIText(
      DEGREE_PROMPT.replace("{degreeName}", resumeInfo.education[index].degree)
    );
  };

  const GenerateSkillSummaryFromAI = async () => {
    if (!resumeInfo?.jobTitle) {
      toast("Please Add Job Title");
      return;
    }
    await generateAIText(
      SKILLS_PROMPT.replace("{jobTitle}", resumeInfo.jobTitle)
    );
  };

  const handleGenerateClick = () => {
    if (activeFormIndex === 3) return GenerateSummaryFromAI();
    if (activeFormIndex === 4) return GenerateDegreeSummaryFromAI();
    if (activeFormIndex === 5) return GenerateSkillSummaryFromAI();
  };

  return (
    <div>
      <div className="flex justify-between my-2">
        <label className="text-xs">
          {activeFormIndex === 3
            ? "Experience Summary"
            : activeFormIndex === 4
            ? "Degree Summary"
            : activeFormIndex === 5
            ? "Skills Summary"
            : ""}
        </label>
        <Button
          variant="outline"
          size="sm"
          onClick={handleGenerateClick}
          disabled={loading}
          type="button"
          className="flex gap-2 text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <Brain className="h-4 w-4" /> Generate from AI
            </>
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={typeof value === "string" ? value : ""}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;
