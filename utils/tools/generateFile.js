const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const generateFile = async (code, input, lang) => {
  const dirCodes = path.join(__dirname, "/../../static/logs");
  if (!fs.existsSync(dirCodes)) fs.mkdirSync(dirCodes, { recursive: true });
  const fileId = uuid();
  const fileName = `${fileId}.${lang}`;
  const folderPath = path.join(dirCodes, fileId);
  const filePath = path.join(folderPath, fileName);
  try {
    fs.mkdirSync(folderPath, { recursive: true });
    fs.writeFileSync(filePath, code);
    if (input) fs.writeFileSync(path.join(folderPath, "input.txt"), input);
    return [folderPath, filePath];
  } catch (e) {
    return Promise.reject({
      status: 500,
      output: "Server error",
    });
  }
};

module.exports = {
  generateFile,
};
