const { compilerService } = require("../services/compilerService");
const { challengeSubmissionService } = require("../services/submissionService");
const { removeFolder } = require("../utils/tools/executeCode");
const {
  generateInputFile,
  generateLangFile,
} = require("../utils/tools/generateFile");

const compile = async (req, res) => {
  try {
    const { input, code, lang } = req.body;
    const [folderPath, filePath] = await generateLangFile(code, lang);
    await generateInputFile(folderPath, input, 0);
    const { status, ...response } = await compilerService(
      folderPath,
      filePath,
      0,
      input ? true : false
    );
    return res.status(status).send(response);
  } catch (err) {
    console.log(err);
    let { status = 500, ...response } = err;
    return res.status(status).send(response);
  } finally {
    removeFolder(folderPath);
  }
};
const executeContestChallenge = async (req, res) => {
  try {
    const { id, code, lang } = req.body;
    const { status, ...response } = await challengeSubmissionService(
      id,
      code,
      lang
    );
    return res.status(status).send(response);
  } catch (err) {
    console.log(err);
    let { status = 500, ...response } = err;
    return res.status(status).send(response);
  }
};
module.exports = { compile, executeContestChallenge };
