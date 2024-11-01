const profilePicApi = [
  "https://xsgames.co/randomusers/avatar.php?g=male",
  "https://xsgames.co/randomusers/avatar.php?g=female",
  "https://xsgames.co/randomusers/avatar.php?g=pixel",
  "https://xsgames.co/randomusers/avatar.php?g=male",
  "https://xsgames.co/randomusers/avatar.php?g=female",
  "https://xsgames.co/randomusers/avatar.php?g=pixel",
  "https://xsgames.co/randomusers/avatar.php?g=male",
  "https://xsgames.co/randomusers/avatar.php?g=female",
  "https://xsgames.co/randomusers/avatar.php?g=pixel",
];
const tabsId = ["ideas-tab", "inprogress-tab", "inreview-tab", "completed-tab"];
const boardSectionsAndDetails = [
  {
    id: "ideas-tab",
    title: "💡 Ideas",
    count: 0,
  },
  {
    id: "inprogress-tab",
    title: "⏳ In Progress",
    count: 0,
  },
  {
    id: "inreview-tab",
    title: "👀 In Review",
    count: 0,
  },
  {
    id: "completed-tab",
    title: "✅ Completed",
    count: 0,
  },
];

const tagShades = [
  {
    light: "#dbe9fe",
    dark: "#1d40b0",
  },
  {
    light: "#e0e7ff",
    dark: "#3730a3",
  },
  {
    light: "#d1fae5",
    dark: "#076046",
  },
  {
    light: "#ffffff",
    dark: "#111111",
  },
  {
    light: "#fce7f3",
    dark: "#9d174d",
  },
  {
    light: "#fef9c3",
    dark: "#a16207",
  },
  {
    light: "#cffafe",
    dark: "#0e7490",
  },
  {
    light: "#f3e8ff",
    dark: "#6d28d9",
  },
  {
    light: "#f0fdfa",
    dark: "#065f46",
  },
  {
    light: "#fff7ed",
    dark: "#9a3412",
  },
];

const defaultData = localStorage.getItem("vanilla-boardData")
  ? JSON.parse(localStorage.getItem("vanilla-boardData"))
  : [
      {
        id: "1",
        todo: "Research new tech stack options",
        status: "ideas-tab",
        profilePic: "https://xsgames.co/randomusers/avatar.php?g=male",
        tags: ["research", "tech"],
      },
      {
        id: "2",
        todo: "Draft initial project proposal",
        status: "ideas-tab",
        profilePic: "https://xsgames.co/randomusers/avatar.php?g=female",
        tags: ["proposal", "planning"],
      },
      {
        id: "3",
        todo: "Design wireframes for homepage",
        status: "inprogress-tab",
        profilePic: "https://xsgames.co/randomusers/avatar.php?g=male",
        tags: ["design", "UI"],
      },
      {
        id: "4",
        todo: "Develop authentication module",
        status: "inprogress-tab",
        profilePic: "https://xsgames.co/randomusers/avatar.php?g=female",
        tags: ["development", "auth"],
      },
      {
        id: "5",
        todo: "Set up CI/CD pipeline",
        status: "inprogress-tab",
        profilePic: "https://xsgames.co/randomusers/avatar.php?g=male",
        tags: ["DevOps", "CI/CD"],
      },
      {
        id: "6",
        todo: "Code review and clean up",
        status: "inreview-tab",
        profilePic: "https://xsgames.co/randomusers/avatar.php?g=female",
        tags: ["review", "cleanup"],
      },
      {
        id: "7",
        todo: "Optimize image assets",
        status: "inreview-tab",
        profilePic: "https://xsgames.co/randomusers/avatar.php?g=male",
        tags: ["optimization", "assets"],
      },
      {
        id: "8",
        todo: "Create test cases for login functionality",
        status: "inreview-tab",
        profilePic: "https://xsgames.co/randomusers/avatar.php?g=female",
        tags: ["testing", "login"],
      },
      {
        id: "9",
        todo: "Update README with project details",
        status: "completed-tab",
        profilePic: "https://xsgames.co/randomusers/avatar.php?g=male",
        tags: ["documentation", "setup"],
      },
      {
        id: "10",
        todo: "Fix CSS styling bugs on mobile view",
        status: "completed-tab",
        profilePic: "https://xsgames.co/randomusers/avatar.php?g=female",
        tags: ["bugfix", "CSS"],
      },
      {
        id: "11",
        todo: "Implement drag-and-drop functionality",
        status: "ideas-tab",
        profilePic: "https://xsgames.co/randomusers/avatar.php?g=male",
        tags: ["feature", "UI"],
      },
      {
        id: "12",
        todo: "Plan team meeting for project updates",
        status: "ideas-tab",
        profilePic: "https://xsgames.co/randomusers/avatar.php?g=female",
        tags: ["meeting", "updates"],
      },
      {
        id: "13",
        todo: "Set up staging environment",
        status: "inprogress-tab",
        profilePic: "https://xsgames.co/randomusers/avatar.php?g=male",
        tags: ["staging", "environment"],
      },
      {
        id: "14",
        todo: "Check for accessibility compliance",
        status: "inreview-tab",
        profilePic: "https://xsgames.co/randomusers/avatar.php?g=female",
        tags: ["accessibility", "compliance"],
      },
      {
        id: "15",
        todo: "Deploy to production",
        status: "completed-tab",
        profilePic: "https://xsgames.co/randomusers/avatar.php?g=male",
        tags: ["deployment", "production"],
      },
    ];

export {
  boardSectionsAndDetails,
  profilePicApi,
  tabsId,
  tagShades,
  defaultData,
};
