const { generateFile } = require("../utils/tools/generateFile");
const { executeCode } = require("../utils/tools/executeCode");
const fs = require("fs");
const compilerService = async (code, input, lang) => {
  const formattedCode = code.join("\r\n");
  let logFolder = "";
  try {
    const [folderPath, filePath] = await generateFile(
      formattedCode,
      input,
      lang
    );
    logFolder = folderPath;
    const output = await executeCode(filePath, input);
    return Promise.resolve({
      code: 200,
      output,
      message : "Complied Successfully."
    });
  } catch (err) {
    console.log(err);
    return Promise.reject({
      code: 500,
      err,
      message : "Error in compilation"
    });
  } finally {
    fs.rmdir(logFolder, { recursive: true }, (err) => {
      if (err) console.log(err);
    });
  }
};

module.exports = { compilerService };
