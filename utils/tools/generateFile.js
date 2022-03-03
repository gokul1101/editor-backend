const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");
const generateInputFile = (folderPath, input, index) => {
  try {
    if (input)
      fs.writeFileSync(path.join(folderPath, `input${index}.txt`), input);
    return Promise.resolve({ status: 200, message: "Generated successfully." });
  } catch (err) {
    return Promise.reject({
      status: 500,
      message: "Error in generating file.",
    });
  }
};
const generateLangFile = async (code, lang) => {
  const formattedCode = code.join("\r\n");
  const dirCodes = path.join(__dirname, "/../../static/logs");
  if (!fs.existsSync(dirCodes)) fs.mkdirSync(dirCodes, { recursive: true });
  const fileId = uuid();
  const fileName = `${fileId}.${lang}`;
  const folderPath = path.join(dirCodes, fileId);
  const filePath = path.join(folderPath, fileName);
  try {
    fs.mkdirSync(folderPath, { recursive: true });
    fs.writeFileSync(filePath, formattedCode);
    return Promise.resolve([folderPath, filePath]);
  } catch (e) {
    return Promise.reject({
      status: 500,
      output: "Server error",
    });
  }
};

module.exports = {
  generateInputFile,
  generateLangFile,
};
