const createSession = async (req, res) => {
  const { user_id, contest_id } = req.body;
  try {
    const { code, message } = await createSessionService(user_id, contest_id);
    res.status(code).send(message);
  } catch (err) {
    console.log(err);
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
    res.status(err.code).send(err.message);
  }
};

module.exports = { createSession, getSession, getAllSessions };
