import { Router } from "express";
import userRouter from "./users";
import cardRouter from "./cards";

const router = Router();

router.use("/users", userRouter);
router.use("/card", cardRouter);


export default router;
