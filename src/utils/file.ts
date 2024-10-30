/**
 * 根据文件名获取语言类型
 * @param fileName 文件名
 * @returns 语言类型
 */
export const getLanguageByFileName = (fileName: string) => {
  const fileExt = fileName.split(".").pop() || "";
  switch (fileExt) {
    case "js":
      return "javascript";
    case "ts":
      return "typescript";
    case "jsx":
      return "javascript";
    case "tsx":
      return "typescript";
    case "html":
      return "html";
    case "json":
      return "json";
    case "css":
      return "css";
    case "scss":
      return "scss";
    case "less":
      return "less";
    default:
      return "javascript";
  }
};
