import { Router } from "express";
import { createUser, getUserById, getUsers, updateProfile, updateAvatar } from "../controllers/users";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:userId", getUserById);
userRouter.post("/", createUser);
userRouter.patch("/me", updateProfile); //обновляет профиль
userRouter.patch("/me/avatar", updateAvatar); //обновляет аватар

export default userRouter;
