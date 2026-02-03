import express from "express"
import { getUser } from "../controllers/leaderBoard";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();
router.get('/leaderboard',protect,getUser);

export default router;
