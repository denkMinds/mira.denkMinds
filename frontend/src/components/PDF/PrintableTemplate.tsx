import { useRef, useState, useEffect } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { Button } from "@components/ui/button";
import { useReactToPrint } from "react-to-print";
import { Vulnerability } from "../scans/Vulnerability";
import MiraLogo from "../../assets/MiraLogo.svg";
import useStore from "../../store/store"; 
import "../PDF/printtemplate.css";


export function PrintableTemplate() {
  const location = useLocation();
  const templateRef = useRef<HTMLDivElement>(null);
  const [templateId, setTemplateId] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isPrinting, setIsPrinting] = useState(false);
  const navigate = useNavigate();

// Get the username from the store
const userData = useStore();
const user = userData.user as any; 

  useEffect(() => {
    // Extract the template ID from the query string
    const params = new URLSearchParams(location.search);
    const template = params.get("template");
    setTemplateId(template);
  }, [location.search]);

  const handlePrint = useReactToPrint({
    contentRef: templateRef,
    documentTitle: selectedTemplate || "Template",
    onBeforePrint: () => {
      setIsPrinting(true);
      return Promise.resolve();
    },
    onAfterPrint: () => {
      setIsPrinting(false);
      setSelectedTemplate(null); // Reset after printing
    },
  });


  return (
    <div className="relative p-8">
    <div className="flex justify-between items-center absolute top-4 left-4 right-4">
      {/* Print Button on Top Right */}
      <Button onClick={handlePrint} variant="outline">
        Print PDF
      </Button>
    </div>

    

    {/* Content with Template Data */}
    <div ref={templateRef} className="mt-8 p-6 border border-gray-300 rounded-lg shadow-lg">
    
    <div className="print-header">
    <div className="flex justify-between items-center">
      
            {/* Logo on the left */}
            <div className="flex items-center">
        <img
          src={MiraLogo}  // Replace with actual logo path
          alt="DenkMinds Logo"
          className="h-12 w-12 rounded-full object-cover"
        />
         
    </div>
      {/* Template Name */}
      <div className="text-center my-8">
      <h1 className="text-3xl font-bold">{templateId ? `Detailed Report For: ${templateId}` : "Loading Template..."}</h1>
    </div>
        <p className="text-sm text-right font-semibold">Generated by: {user?.username}</p>
      </div>
      </div>

     

      {/* Static Summary Section */}
      {/* <div className="text-sm mb-6"> */}
      <div className="avoid-break">
        <h2 className="font-semibold text-lg">Summary</h2>
        <ul className="list-disc pl-5">
          <li>Executive Summary</li>
            <li>The recent Dynamic Application Security Testing (DAST) scan conducted on the
application hosted at https://denkminds.vercel.app has provided valuable insights into
the security posture of the web application.  </li>
          <li>Critical Finding</li>
          <li>The scan commenced on 24th December
2024 at 21:53:22 UTC and successfully concluded at 21:57:48 UTC, assessing a total of
702 unique URLs within the application's scope. </li>
          <li>Risk Analysis</li>
          <li> The scan commenced on 24th December
2024 at 21:53:22 UTC and successfully concluded at 21:57:48 UTC, assessing a total of
702 unique URLs within the application's scope. </li>
          <li>Technical Details</li>
          <li>The recent Dynamic Application Security Testing (DAST) scan conducted on the
application hosted at https://denkminds.vercel.app has provided valuable insights into
the security posture of the web application.  </li>
        </ul>
      </div>

      {/* Template Content (Vulnerability Data) */}
      <div className="diagram avoid-break">
        {templateId ? (
          <Vulnerability templateId={templateId} />
        ) : (
          <p>Loading template data...</p>
        )}
      </div>
      {/* Footer Section */}
    <div className="print-footer">
      <p className="text-sm">© 2025 denkMinds. All rights reserved.</p>
     
    </div>
    </div>

    
  </div>
);
}