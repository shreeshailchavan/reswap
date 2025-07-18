import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../../config/db.js";
import dotenv from "dotenv";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET || "";
const jwtExpiry = process.env.JWT_EXPIRY || "15m";

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return res.status(400).json({ message: "Please provide all the required fields" });

  try {
    const userCheck = await pool.query(
      'SELECT id FROM users WHERE email = $1 OR username = $2',
      [email, username]
    );

    if (userCheck.rows.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertResult = await pool.query(
      'INSERT INTO users (username, email, password) VALUES($1, $2, $3) RETURNING id, username, email',
      [username, email, hashedPassword]
    );

    const user = insertResult.rows[0];
    res.status(201).json({ message: "User registered successfully", user });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Please provide email and password" });

  try {
    const userCheck = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (userCheck.rows.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = userCheck.rows[0];

    const checkPass = await bcrypt.compare(password, user.password);
    if (!checkPass) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.id },
      jwtSecret,
      {
        expiresIn: jwtExpiry,
        algorithm: 'HS256'
      }
    );

    res.json({
      message: "Login successful",
      token,
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};