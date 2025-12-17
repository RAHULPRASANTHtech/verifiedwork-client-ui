import React, { forwardRef } from "react";
import ClientReportDocument from "./ClientReportDocument";

const ReportExportContainer = forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "794px",       // A4 width
        visibility: "hidden", // IMPORTANT
        zIndex: -1,
        background: "white",
      }}
    >
      <ClientReportDocument />
    </div>
  );
});

export default ReportExportContainer;