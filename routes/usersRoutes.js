import express from "express";

import { getAllUsers } from "../controllers/user/getAllUsers.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { getUserProfile } from "../controllers/user/getUserProfile.js";
import { getUserByEmail } from "../controllers/user/getUserByEmail.js";

function usersRoutes() {
  const router = express.Router();

  router.get("/all-users", verifyToken, getAllUsers);
  router.post("/get-user-profile", verifyToken, getUserProfile);
  router.post("/search-user", getUserByEmail);
  return router;
}

export default usersRoutes;
