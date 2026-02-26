const pool = require("../db/pool");
const path = require("node:path");

async function getUsernames(req, res) {
  try {
    const { rows: usernames } = await pool.query("SELECT * FROM usernames");
    console.log("Usernames: ", usernames);
    res.send({ Usernames: usernames.map((user) => user.username) });
  } catch (error) {
    console.error("Error fetching:", error);
    res.status(500).json({
      error: "Error fetching",
      details: error.message,
    });
  }
}

// async function createUsernameGet(req, res) {
//   res.sendFile(path.join(__dirname, "../form.html"));
// }

// async function createUsernamePost(req, res) {
//   const { username } = req.body;
//   await db.insertUsername(username);
//   res.redirect("/");
// }

module.exports = {
  getUsernames,
  //   createUsernameGet,
  //   createUsernamePost,
};
