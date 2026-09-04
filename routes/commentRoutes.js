const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createComment,
  getComments,
} = require("../controllers/commentController");

router.get("/:id/comments", getComments);

router.post("/:id/comments", protect, createComment);

module.exports = router;