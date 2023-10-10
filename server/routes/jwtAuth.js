const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

// register route
router.post("/register", validInfo, async (req, res) => {
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
    // generate jwt token
    const token = jwtGenerator(newUser.rows[0].user_id);
    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server Error");
  }
});

// login route
router.post("/login", validInfo, async (req, res) => {
  try {
    // desstructure req.body
    const { email, password } = req.body;
    // check if user does not exists (if not throw error)
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.status(401).json("Password or Email is incorrect");
    }
    // check if incoming password is the same with the datdabase password
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );
    if (!validPassword) {
      return res.status(401).json("password or Email in incorrect");
    }

    // give them a jwt token
    const token = jwtGenerator(user.rows[0].user_id);
    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server Error");
  }
});

router.get("/is-verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
