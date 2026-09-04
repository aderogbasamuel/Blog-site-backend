const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "2d" });
};
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists with this email",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({
      err: "Server Error",
    });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password, not found",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password, password wrong",
      });
    }

    res.status(200).json({ token: generateToken(user._id) });
  } catch (err) {
  console.error("LOGIN ERROR:", err);

  res.status(500).json({
    message: "Server error, could not login",
  });
}
};
const me = async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");

    res.status(200).json(user);
  } catch (error) {
    console.error("ME ERROR:", error);

    res.status(500).json({
      message: "Server error, could not get user",
    });
  }
};

module.exports = {
  register,
  login,
  me,
};
