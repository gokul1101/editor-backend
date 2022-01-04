const createSession = async (req, res) => {
  const { user_id, contest_id } = req.body;
  try {
    const { status, message } = await createSessionService({
      user_id,
      contest_id,
    });
    res.status(status).send(message);
  } catch (err) {
    res.status(err.status).send(err.message);
  }
};
const getSession = async (req, res) => {
  const { user_id, contest_id } = req.body;
  try {
    const { status, message } = await getSessionService({ user_id, contest_id });
    res.status(status).send(message);
  } catch (err) {
    res.status(err.status).send(err.message);
  }
};
const getAllSessions = async (req, res) => {
  const { user_id, contest_id } = req.body;
  try {
    const { status, message } = await getAllSessionsService(user_id, contest_id);
    res.status(status).send(message);
  } catch (err) {
    res.status(err.status).send(err.message);
  }
};

module.exports = { createSession, getSession, getAllSessions };
