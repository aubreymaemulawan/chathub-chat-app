import express from "express";
import multer from "multer";
import { createMessage, getMessages } from "../controllers/chatMessage.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });
const router = express.Router();

router.post("/", upload.single("image"), createMessage);
router.get("/:chatRoomId", getMessages);

export default router;
