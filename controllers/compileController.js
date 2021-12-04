const { compilerService } = require("../services/compilerService");

const compile = async (req, res) => {
  try {
    const { input, code } = req.body;
    const result = await compilerService(code, input);
    if (result.code === 200) res.status(result.code).json(result.output);
  } catch (err) {
    if (!err.code) {
      err.code = 500;
      err.err = "Internal Server Error";
    }
    res.status(500).send(err.err);
  }
};
module.exports = { compile };
