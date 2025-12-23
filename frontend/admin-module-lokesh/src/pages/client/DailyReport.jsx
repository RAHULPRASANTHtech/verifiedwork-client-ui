import React from "react";

import {
  WeeklyActivityChart,
  TaskDistributionChart,
} from "../../components/reports/ProductivityCharts";

import ScreenshotViewer from "../../components/reports/ScreenshotViewer";
import ActivityStats from "../../components/reports/ActivityStats";

import {
  MOCK_ACTIVITY_DATA,
  MOCK_TASK_DISTRIBUTION,
  MOCK_SCREENSHOTS,
} from "../../services/reportMockData";

const DailyReport = () => {
  return (
    <div className="text-slate-200">
      <h1 className="text-2xl font-bold text-white mb-8">
        Tracking Report
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="lg:col-span-2">
          <WeeklyActivityChart data={MOCK_ACTIVITY_DATA} />
        </div>
        <div className="lg:col-span-1">
          <TaskDistributionChart data={MOCK_TASK_DISTRIBUTION} />
        </div>
      </div>

      <div className="mb-10">
        <ActivityStats />
      </div>

      <div className="mb-10">
        <ScreenshotViewer screenshots={MOCK_SCREENSHOTS} />
      </div>
    </div>
  );
};

export default DailyReport;
