import { Router } from "express";
import { createCard, deleteCardById, getCards, cardLike, cardLikeRemove } from "../controllers/card";

const cardRouter = Router();

cardRouter.get("/", getCards);
cardRouter.delete("/:cardId", deleteCardById);
cardRouter.post("/", createCard);
cardRouter.put("/:cardId/likes", cardLike);
cardRouter.delete("/:cardId/likes", cardLikeRemove);

export default cardRouter;

