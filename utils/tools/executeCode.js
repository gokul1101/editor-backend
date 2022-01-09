const { exec } = require("child_process");
const path = require("path");
const executeCode = (filePath, input) => {
  const [fileId, fileFormat] = path.basename(filePath).split(".");
  let command = ``;
  if (fileFormat === "c") {
    if (input)
      command = `gcc ${filePath} -o ${path.dirname(
        filePath
      )}/${fileId} && ${path.dirname(filePath)}/${fileId} a.exe < ${path.join(
        path.dirname(filePath),
        "input.txt"
      )}`;
    else {
      command = `gcc ${filePath} -o ${path.dirname(
        filePath
      )}/${fileId} && ${path.dirname(filePath)}/${fileId} a.exe`;
    }
  } else if (fileFormat === "java") {
    if (input)
      command = `javac ${filePath} && java -cp ${path.dirname(
        filePath
      )} Main < ${path.join(path.dirname(filePath), "input.txt")}`;
    // else command = `javac ${filePath} && java ${path.dirname(filePath)}`;
    else
      command = `javac ${filePath} && java -cp ${path.dirname(filePath)} Main`;
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

module.exports = {
  executeCode,
};
