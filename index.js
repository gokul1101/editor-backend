const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

const { MONGOURI } = require("./config/index");
mongoose.connect(
  MONGOURI,
  {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  },
  () => console.log("Connected to DB")
);

const router = require("./router/route");
app.use(router);

app.listen(PORT, () => console.log("Connected to port " + PORT));
