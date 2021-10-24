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
      try {
        let user = await User.findById(payload.user_id);
        user ? done(null, { ...user, role: payload.role }) : done(null, false);
      } catch (err) {
        done(null, false);
      }
    })
  );
};
