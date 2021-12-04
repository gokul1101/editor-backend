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
    // if(input) {
    //   fs.mkdirSync(folderPath, { recursive: true });
    //   await fs.writeFileSync(filePath, code);
    //   await fs.writeFileSync(path.join(folderPath, "input.txt"), input);
    // }
    fs.mkdirSync(folderPath, { recursive: true });
    await fs.writeFileSync(filePath, code);
    if (input)
      await fs.writeFileSync(path.join(folderPath, "input.txt"), input);
  } catch (e) {
    return Promise.reject({
      status: 500,
      output: "Server error",
    });
  }
  return [folderPath, filePath];
};

module.exports = {
  generateFile,
};
