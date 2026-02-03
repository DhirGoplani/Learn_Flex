import express from "express"
import { getUser } from "../controllers/leaderBoard";

const router = express.Router();
router.get('/leaderboard',getUser);

export default router;
