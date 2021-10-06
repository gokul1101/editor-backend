const dotenv = require("dotenv")
dotenv.config()
const MONGOURI = process.env.DB
module.exports = {MONGOURI}