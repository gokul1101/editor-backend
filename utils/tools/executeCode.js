const { exec } = require("child_process");
const path = require("path");
const executeCode = (filePath, input) => {
  const [fileId, fileFormat] = path.basename(filePath).split(".");
  let command = ``;
  switch (fileFormat) {
    case "c":
      break;
    case "java":
      command = `javac ${filePath} && java -cp ${path.dirname(
        filePath
      )} Main < ${path.join(path.dirname(filePath), "input.txt")}`;
      break;
    default:
      break;
  }
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) reject(stderr);
      resolve(stdout);
    });
  });
};

module.exports = {
  executeCode,
};
