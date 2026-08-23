import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = Router();

// Apply protect middleware to ALL routes in this router
router.use(protect);

// 1. Any logged-in user can access
router.get("/profile", (req, res) => {
  res.status(200).json({
    message: "User profile accessed successfully!",
    user: req.user,
  });
});

// 2. Only 'admin' role can access
router.get("/admin", authorizeRoles("admin"), (req, res) => {
  res.status(200).json({
    message: "Welcome to the Admin Dashboard!",
  });
});

// 3. 'admin' OR 'moderator' roles can access
router.get("/mod", authorizeRoles("admin", "moderator"), (req, res) => {
  res.status(200).json({
    message: "Welcome to the Moderator Panel!",
  });
});

export default router;
