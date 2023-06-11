import express from "express";

import {
  loginUser,
  createUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/user.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/", getAllUsers);
router.get("/:userId", getUser);
router.post("/profile/:userId", updateUser);

export default router;
