// services/reportMockData.js

export const MOCK_ACTIVITY_DATA = [
  { name: 'Mon', hours: 6.5, activity: 85, tasks: 4 },
  { name: 'Tue', hours: 7.2, activity: 92, tasks: 6 },
  { name: 'Wed', hours: 4.8, activity: 60, tasks: 2 },
  { name: 'Thu', hours: 8.0, activity: 88, tasks: 7 },
  { name: 'Fri', hours: 5.5, activity: 75, tasks: 5 },
  { name: 'Sat', hours: 2.0, activity: 40, tasks: 1 },
  { name: 'Sun', hours: 0.0, activity: 0, tasks: 0 },
];

export const MOCK_TASK_DISTRIBUTION = [
  { name: 'Completed', value: 18, color: '#10B981' }, // Emerald
  { name: 'In Progress', value: 5, color: '#3B82F6' }, // Blue
  { name: 'Review', value: 3, color: '#F59E0B' }, // Amber
  { name: 'Pending', value: 4, color: '#9CA3AF' }, // Gray
];

export const MOCK_SCREENSHOTS = [
  {
    id: 1,
    time: "09:10 AM",
    activity: "92%",
    app: "vscode",
    img: "https://placehold.co/300x200/png?text=VS+Code",
  },
  {
    id: 2,
    time: "09:20 AM",
    activity: "88%",
    app: "stackoverflow",
    img: "https://placehold.co/300x200/png?text=StackOverflow",
  },
  {
    id: 3,
    time: "09:30 AM",
    activity: "45%",
    app: "slack",
    img: "https://placehold.co/300x200/png?text=Slack",
  },
  {
    id: 4,
    time: "09:40 AM",
    activity: "95%",
    app: "terminal",
    img: "https://placehold.co/300x200/png?text=Terminal",
  },
  {
    id: 5,
    time: "09:50 AM",
    activity: "82%",
    app: "figma",
    img: "https://placehold.co/300x200/png?text=Figma",
  },
  {
    id: 6,
    time: "10:00 AM",
    activity: "10%",
    app: "idle",
    img: "https://placehold.co/300x200/png?text=Idle",
  },
];


export const MOCK_TASKS = [
  {
    id: 1,
    title: "UI Design",
    estimatedHours: 10,
    actualHours: 8,
    subtasks: [
      { name: "Wireframes", hours: 3 },
      { name: "Design System", hours: 2 },
      { name: "Final UI", hours: 3 },
    ],
  },
  {
    id: 2,
    title: "Frontend Development",
    estimatedHours: 20,
    actualHours: 18,
    subtasks: [
      { name: "Dashboard", hours: 6 },
      { name: "Charts", hours: 5 },
      { name: "Integration", hours: 7 },
    ],
  },
  {
    id: 3,
    title: "Testing & Review",
    estimatedHours: 8,
    actualHours: 6,
    subtasks: [
      { name: "Unit Testing", hours: 3 },
      { name: "Bug Fixes", hours: 3 },
    ],
  },
];

export const KPI_SUMMARY = {
  totalHours: '34h 12m',
  avgActivity: '82%',
  earnings: '$1,250',
  tasksCompleted: 24,
  estimatedHoursRemaining: "18 hrs",
  avgTaskTime: "1.4 hrs",
};
// 🔥 GRID-READY SCREENSHOTS (Worksnaps-style)
export const MOCK_SCREENSHOT_GRID = [
  {
    id: "s1",
    hour: 9,
    slot: "00-10",
    time: "09:05",
    activity: 92,
    app: "vscode",
    img: "https://placehold.co/300x200/png?text=VS+Code",
  },
  {
    id: "s2",
    hour: 9,
    slot: "10-20",
    time: "09:15",
    activity: 88,
    app: "stackoverflow",
    img: "https://placehold.co/300x200/png?text=StackOverflow",
  },
  {
    id: "s3",
    hour: 9,
    slot: "20-30",
    time: "09:25",
    activity: 45,
    app: "slack",
    img: "https://placehold.co/300x200/png?text=Slack",
  },
  {
    id: "s4",
    hour: 10,
    slot: "00-10",
    time: "10:05",
    activity: 95,
    app: "terminal",
    img: "https://placehold.co/300x200/png?text=Terminal",
  },
];
