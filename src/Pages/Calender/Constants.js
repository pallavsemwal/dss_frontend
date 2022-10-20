export const primaryColor = "#F0AD4E";

// Different Colors for Each Priority -> Green, Yellow , Red
export const priorityColor = ["#00FF00", "#FFFF00", "#FF0000"];

export const parsePriorityColor = (priority) => {
  if (priority) return priorityColor[parseInt(priority.slice(2, 3)) - 1];
};

export const monthDict = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const dayDict = ["M", "T", "W", "T", "F", "S", "S"];

export const statusCode = {
  SUCCESS: "200",
  BAD_REQUEST: "400",
  UNAUTHORIZED: "401",
  FORBIDDEN: "403",
  NOT_FOUND: "404",
  CONFLICT: "409",
  INTERNAL_SERVER_ERROR: "500",
  UNAVAILABLE: "503",
};
