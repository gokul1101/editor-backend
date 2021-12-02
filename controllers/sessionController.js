const createSession = async (req, res) => {
  const { user_id, contest_id } = req.body;
  try {
    const { code, message } = await createSessionService(user_id, contest_id);
    res.status(code).send(message);
  } catch (err) {
    console.log(err);
    if(!err.code) {
      err.code = 500;
      err.message = `Internal server Error on creating session`;
    }
    res.status(err.code).send(err.message);
  }
};
const getSession = async (req, res) => {
  const { user_id, contest_id } = req.body;
  try {
    const { code, message } = await getSessionService(user_id, contest_id);
    res.status(code).send(message);
  } catch (err) {
    console.log(err);
    if(!err.code) {
      err.code = 500;
      err.message = `Internal server Error on getting session`;
    }
    res.status(err.code).send(err.message);
  }
};
const getAllSessions = async (req, res) => {
  const { user_id, contest_id } = req.body;
  try {
    const { code, message } = await getAllSessionsService(user_id, contest_id);
    res.status(code).send(message);
  } catch (err) {
    console.log(err);
    if(!err.code) {
      err.code = 500;
      err.message = `Internal server Error on getting sessions`;
    }
    res.status(err.code).send(err.message);
  }
};

module.exports = { createSession, getSession, getAllSessions };
