const { generateFile } = require("../utils/tools/generateFile");
const { executeCode } = require("../utils/tools/executeCode");
const fs = require("fs");
const compiler = async (req, res) => {
    const { code, input } = req.body;
    const formattedCode = code.join("\r\n");
    let logFolder = "";
    try {
      const [folderPath, filePath] = await generateFile(
        formattedCode,
        input,
        "java"
      );
      logFolder = folderPath;
      const output = await executeCode(filePath, input);
      res.status(200).send(output);
    } catch (err) {
      res.status(500).send(err);
    } finally {
      fs.rmdir(logFolder, { recursive: true }, (err) => {
        if (err) console.log(err);
      });
    }
  }

module.exports = compiler