const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");

router.post("/register", async (req, res) => {
  try {
    // destructure req.body (name , email, password)
    const { name, email, password } = req.body;
    // check if user exist (if user exist then throw errorw)
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length !== 0) {
      return res.status(401).send("User already exist");
      // 401 means unauthenticated
    }

    // bcrypt the user password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    // enter the new user inside our database
    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, bcryptPassword]
    );
    res.json(newUser.rows[0]);
    // generate jwt token
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server Error");
  }
});

module.exports = router;
