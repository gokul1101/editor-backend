const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const executeCode = (folderPath, filePath, index, flag) => {
  const [fileId, fileFormat] = path.basename(filePath).split(".");
  let command = ``;
  if (fileFormat === "c") {
    if (flag)
      command = `gcc ${filePath} -o ${folderPath}/${fileId} && ${folderPath}/${fileId} a.exe < ${path.join(
        folderPath,
        `input${index}.txt`
      )}`;
    else {
      command = `gcc ${filePath} -o ${folderPath}/${fileId} && ${folderPath}/${fileId} a.exe`;
    }
  } else if (fileFormat === "java") {
    if (flag)
      command = `javac ${filePath} && java -cp ${folderPath} Main < ${path.join(
        folderPath,
        `input${index}.txt`
      )}`;
    else command = `javac ${filePath} && java -cp ${folderPath} Main`;
  }
  return new Promise((resolve, reject) => {
    exec(command, { maxBuffer: 1024 * 1024 }, (error, stdout, stderr) => {
      if (error) {
        stderr = stderr.split(filePath);
        stderr = stderr.filter((err) => err !== "").map((err) => `Main ${err}`);
        stderr.code = error.code;
        reject(stderr);
      }
      resolve(stdout);
    });
  });
};
const removeFolder = (folderPath) => {
  if (fs.existsSync(folderPath)) {
    fs.rmdir(folderPath, { recursive: true }, (err) => {
      if (err) console.log(err);
    });
  }
};
module.exports = {
  executeCode,
  removeFolder,
};
