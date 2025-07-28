import React, { useEffect, useState } from "react";
import PersonalDetails from "./forms/PersonalDetails";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from "lucide-react";
import Summary from "./forms/Summary";
import Experience from "./forms/Experience";
import Education from "./forms/Education";
import Skills from "./forms/Skills";
import { useNavigate, Link, useParams } from "react-router-dom";
import View from "@/my-resume/[resumeId]/view";

function FormSection() {
  // ✅ Default to step 1 (Personal Details)
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const [activeFormIndex, setActiveFormIndex] = useState(() => {
    return parseInt(localStorage.getItem("activeFormIndex")) || 1;
  });

  useEffect(() => {
    localStorage.setItem("activeFormIndex", activeFormIndex);
  }, [activeFormIndex]);

  const goToNextForm = () => {
    if (activeFormIndex < 5) {
      setActiveFormIndex((prev) => prev + 1);
    }
  };

  const goToPreviousForm = () => {
    if (activeFormIndex > 1) {
      setActiveFormIndex((prev) => prev - 1);
    }
  };
  const goToPreview = () => {
    navigate("/my-resume/" + resumeId + "/view");
  };

  return (
    <div>
      <div className="flex justify-between mb-3">
        <div
          className="flex
        gap-2 "
        >
          <Link to={"/dashboard"}>
            <Button className="btn" variant="outline " size="sm">
              <Home></Home>
            </Button>
          </Link>
          {/* <ThemeColor></ThemeColor> */}
        </div>

        <div className="flex gap-2 items-center">
          {activeFormIndex > 1 && (
            <Button size="sm" onClick={goToPreviousForm}>
              <ArrowLeft />
            </Button>
          )}
          {activeFormIndex < 5 && (
            <Button size="sm" onClick={goToNextForm}>
              Next <ArrowRight />
            </Button>
          )}
          {activeFormIndex === 5 && (
            <Button size="sm" className="btn" onClick={goToPreview}>
              Preview <ArrowRight />
            </Button>
          )}
        </div>
      </div>

      {/* Step 1: Personal Details */}
      {activeFormIndex === 1 && <PersonalDetails onNext={goToNextForm} />}

      {/* Step 2: Summary */}
      {activeFormIndex === 2 && <Summary onNext={goToNextForm} />}

      {/* Step 3: Experience */}
      {activeFormIndex === 3 && (
        <Experience onNext={goToNextForm} activeFormIndex={3} />
      )}

      {/* Step 4: Education */}
      {activeFormIndex === 4 && (
        <Education onNext={goToNextForm} activeFormIndex={4} />
      )}

      {/* Step 5: Skills */}
      {activeFormIndex === 5 && (
        <Skills
          onNext={goToNextForm}
          activeFormIndex={5}
          goToPreview={goToPreview}
        />
      )}
      {activeFormIndex === 6 && <View activeFormIndex={6} />}
    </div>
  );
}

export default FormSection;
