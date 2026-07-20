import { Router, type IRouter } from "express";
import healthRouter from "./health";
import guestbookRouter from "./guestbook";
import anthropicRouter from "./anthropic/index";
import openrouterRouter from "./openrouter/index";

const router: IRouter = Router();

router.use(healthRouter);
router.use(guestbookRouter);
router.use(anthropicRouter);
router.use(openrouterRouter);

export default router;
