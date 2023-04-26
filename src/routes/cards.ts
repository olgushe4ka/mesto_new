import { Router } from "express";
import { createCard, getCardById, getCards, cardLike, cardLikeRemove } from "../controllers/card";

const cardRouter = Router();

cardRouter.get("/", getCards);
cardRouter.get("/:cardId", getCardById);
cardRouter.post("/", createCard);
cardRouter.put("/:cardId/likes", cardLike);
cardRouter.delete("/:cardId/likes", cardLikeRemove);

export default cardRouter;

