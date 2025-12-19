import { useRef } from "react";
import { Download } from "lucide-react";
import html2pdf from "html2pdf.js/dist/html2pdf.bundle.min.js";
import ClientReportDocument from "../../components/reports/ClientReportDocument";

const Reports = () => {
  const reportRef = useRef(null);

  const handleExportPDF = async () => {
    console.log("EXPORT CLICKED");

    if (!reportRef.current) {
      console.error("Report ref not found");
      return;
    }

    await html2pdf()
      .set({
        margin: 0.5,
        filename: "client-project-report.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
        },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      })
      .from(reportRef.current)
      .save();
  };

return (
  <div>
    <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
      Export Report
    </h1>

    <button
      onClick={handleExportPDF}
      className="
        flex items-center gap-2
        bg-white dark:bg-slate-800
        border border-slate-200 dark:border-slate-700
        text-slate-900 dark:text-slate-200
        px-4 py-2 rounded-lg
        hover:bg-slate-100 dark:hover:bg-slate-700
        mb-6
        transition
      "
    >
      <Download className="w-4 h-4" />
      Export Professional Report
    </button>

    {/* ALWAYS MOUNTED, OFFSCREEN */}
    <div className="absolute -left-[9999px] top-0">
      <div ref={reportRef}>
        <ClientReportDocument />
      </div>
    </div>
  </div>
);
};
export default Reports;
