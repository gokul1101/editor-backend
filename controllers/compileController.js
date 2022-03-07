const { compilerService } = require("../services/compilerService");
const {
  updateExecutionService,
  createExecutionService,
} = require("../services/executionService");
const { challengeSubmissionService } = require("../services/submissionService");
const { removeFolder } = require("../utils/tools/executeCode");
const {
  generateInputFile,
  generateLangFile,
} = require("../utils/tools/generateFile");

const compile = async (req, res) => {
  let path;
  try {
    const { input, code, lang } = req.body;
    const [folderPath, filePath] = await generateLangFile(code, lang);
    path = folderPath;
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
    removeFolder(path);
  }
};
const executeContestChallenge = async (req, res) => {
  try {
    const { id, question_id, code, lang, contest_id } = req.body;
    const user_id = req.user._id;
    let execution;
    if (id) execution = await updateExecutionService(id, code);
    else
      execution = await createExecutionService({
        user_id,
        contest_id,
        question_id,
        code,
      });
    const { status, ...response } = await challengeSubmissionService(
      question_id,
      code,
      lang
    );
    response.execution_id = execution._id;
    return res.status(status).send(response);
  } catch (err) {
    console.log(err);
    let { status = 500, ...response } = err;
    return res.status(status).send(response);
  }
};
module.exports = { compile, executeContestChallenge };
