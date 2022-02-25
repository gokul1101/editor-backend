const { compilerService } = require("../services/compilerService");
const { challengeSubmissionService } = require("../services/submissionService");

const compile = async (req, res) => {
  try {
    const { input, code, lang } = req.body;
    const { status, ...response } = await compilerService(code, input, lang);
    return res.status(status).send(response);
  } catch (err) {
    console.log(err);
    let { status = 500, ...response } = err;
    return res.status(status).send(response);
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
