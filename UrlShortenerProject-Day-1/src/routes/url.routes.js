import { Router } from "express";
import { createShortUrl, redirectUrl, getAllUrls } from "../controllers/url.controller.js";

const router = Router();

router.route("/urls")
  .post(createShortUrl)
  .get(getAllUrls);

router.route('/:shortCode').get(redirectUrl);

export default router;