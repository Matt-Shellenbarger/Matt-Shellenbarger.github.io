import { Router, type IRouter } from "express";
import healthRouter from "./health";
import guestbookRouter from "./guestbook";
import productivityRouter from "./productivity";

const router: IRouter = Router();

router.use(healthRouter);
router.use(guestbookRouter);
router.use(productivityRouter);

export default router;
