const { compilerService } = require("../services/compilerService");
const { challengeSubmissionService } = require("../services/submissionService");

const compile = async (req, res) => {
  try {
    const { input, code, lang } = req.body;
    const {status, output} = await compilerService(code, input, lang);
    res.status(status).json(output);
  } catch ({status, err, message}) {
    res.status(status).json({err, message});
  }
};
const executeContestChallenge = async (req, res) => {
  try {
    const { id, code, lang } = req.body;
    const result = await challengeSubmissionService(id, code, lang);
    res.status(result.status).json(result)
  } catch (err) {
    res.status(err.status).json(err);
  }
}
module.exports = { compile, executeContestChallenge};
