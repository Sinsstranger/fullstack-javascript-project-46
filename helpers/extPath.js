import path from "path";
const getFileExtension = (thePath) => path.extname(thePath).replace(".", "");
const resolvePath = (thePath) =>
  path.isAbsolute(thePath) ? thePath : path.resolve(process.cwd(), thePath);
export { getFileExtension, resolvePath };
