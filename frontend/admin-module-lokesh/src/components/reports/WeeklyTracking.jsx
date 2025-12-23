import {
  WeeklyActivityChart,
  TaskDistributionChart,
} from "./ProductivityCharts";
import ActivityStats from "./ActivityStats";
import ScreenshotViewer from "./ScreenshotViewer";
import {
  MOCK_ACTIVITY_DATA,
  MOCK_TASK_DISTRIBUTION,
  MOCK_SCREENSHOTS,
} from "../../services/reportMockData";

export default function WeeklyTracking() {
  return (
    <div className="space-y-8">
      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WeeklyActivityChart data={MOCK_ACTIVITY_DATA} />
        </div>
        <div>
          <TaskDistributionChart data={MOCK_TASK_DISTRIBUTION} />
        </div>
      </div>

      {/* ACTIVITY */}
      <ActivityStats />

      {/* SCREENSHOTS */}
      <ScreenshotViewer screenshots={MOCK_SCREENSHOTS} />
    </div>
  );
}
