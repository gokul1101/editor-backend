const User = require("../models/users");
const { SECRET } = require("../config/index");
const { Strategy, ExtractJwt } = require("passport-jwt");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET,
};

module.exports = (passport) => {
  passport.use(
    new Strategy(opts, async (payload, done) => {
      await User.findById(payload.user_id)
        .then((user) => {
          return user ? done(null, user) : done(null, false);
        })
        .catch((err) => done(null, false));
    })
  );
};
