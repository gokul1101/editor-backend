const express = require("express");
const { connect } = require("mongoose");
const { success, error } = require("consola");
const cors = require("cors");
const passport = require("passport");

//* CONSTANTS
const { DB, PORT } = require("./config/index");

//* APP INTIALIZATION
const app = express();
const fileupload = require("express-fileupload");
//* MIDDLEWARES

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileupload());
app.use(passport.initialize());
require("./middlewares/passport")(passport);

//* Router Middleware
app.use(require("./router/route"));

const startApp = async () => {
  try {
    //* DB CONNECTION
<<<<<<< HEAD
    await connect(DB, {
=======
    connect(DB, {
>>>>>>> 8c8eb1f7bbe9348f454449d77f15a5eddf533f2c
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    success({ message: `Connected to DB \n${DB}`, badge: true });

    //* Started listening to DB
    app.listen(PORT, () =>
      success({ message: `Server started on PORT ${PORT}`, badge: true })
    );
  } catch (err) {
    //! Error in connecting DB
    error({
      message: `Unable to connect with DB \n${err}`,
      badge: true,
    });
    startApp();
  }
};
startApp();

// app.use('/static', express.static(`${__dirname}/static`, { maxAge: '28 days' }));
