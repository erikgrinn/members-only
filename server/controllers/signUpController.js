const pool = require("../db/pool");
const path = require("node:path");
const bcrypt = require("bcryptjs");

async function signUpPost(req, res, next) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // added for bcrypt
    // hashedPassword instead
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [req.body.username, hashedPassword]);
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  signUpPost,
};
