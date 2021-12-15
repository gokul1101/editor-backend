const { compilerService } = require("../services/compilerService");
const { challengeSubmissionService } = require("../services/submissionService");

const compile = async (req, res) => {
  try {
    const { input, code, lang } = req.body;
    const result = await compilerService(code, input, lang);
    if (result.code === 200) res.status(result.code).json(result.output);
  } catch (err) {
    if (!err.code) {
      err.code = 500;
      err.err = "Internal Server Error";
    }
    res.status(500).send(err.err);
  }
};
const executeContestChallenge = async (req, res) => {
  try {
    const { id, code, lang } = req.body;
    const result = await challengeSubmissionService(id, code, lang);
    res.send(result)
    // if (result.code === 200) res.status(result.code).json(result.output);
  } catch (err) {
    console.log(err)
    if (!err.code) {
      err.code = 500;
      err.err = "Internal Server Error";
    }
    res.status(500).send(err);
  }
}
module.exports = { compile, executeContestChallenge};
