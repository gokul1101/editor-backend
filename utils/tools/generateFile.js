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
    await fs.writeFileSync(filePath, code);
    await fs.writeFileSync(path.join(folderPath, "input.txt"), input);
  } catch(e) {
    return new Promise((resolve, reject) => {
      
    })
  }

  return filePath;
};

module.exports = {
  generateFile,
};
