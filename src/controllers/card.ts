import { Request, Response } from "express";
import mongoose from "mongoose";
import Card from "../models/card";
import User from "../models/user";
import { RequestCustom } from "types";


// GET /users — возвращает всех пользователей
// GET /users/:userId - возвращает пользователя по _id



export const getCards = async (req: Request, res: Response) => {
  try {
    const cards = await Card.find({});
    return res.status(200).send(cards);
  } catch (error) {
    return res.status(500).send({ message: "Ошибка на стороне сервера" });
  }
};

export const getCardById = async (req: Request, res: Response) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findById(cardId);

    if (!card) {
      const error = new Error("Нет пользователя по заданному id");
      error.name = "NotFound";
      throw error;
    }

    return res.status(200).send(card);
  } catch (error) {
    if (error instanceof Error && error.name === "NotFound") {
      return res.status(404).send({ message: error.message });
    }

    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).send({ message: error.message });
    }

    return res.status(500).send({ message: "Ошибка на стороне сервера" });
  }
};


// POST /users — создаёт пользователя
// В теле POST-запроса на создание пользователя передайте JSON-объект с тремя полями: name, about и avatar.


export const createCard = async (req:RequestCustom, res: Response) => {
  try {
console.log(req.body)
//console.log(req.user);
console.log(req.user?._id);

const owner = await User.findById(req.user?._id);

    const { name, link } = req.body;
    if (!name || !link )  {
      const error = new Error("Переданы не все обязательны поля");
      error.name = "CustomValid";
      throw error;
    }

    const newCard = {name, link, owner}

    const newCardCreate = await Card.create(newCard);
    return res.status(201).send(newCardCreate);
  } catch (error) {
    console.log(`Ошибка ${error}`)
    if (error instanceof Error && error.name === "CustomValid") {
      return res.status(400).send({ message: error.message });
    }

    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send({ message: error.message });
    }

    return res.status(500).send({ message: "Ошибка на стороне сервера" });
  }
};


export const cardLike = async (req: Request, res: Response) => {
  try{console.log(req.body);}
  catch (error) { console.log(`Ошибка ${error}`)}
}

export const cardLikeRemove = async (req: Request, res: Response) => {
  try{console.log(req.body);}
  catch (error) { console.log(`Ошибка ${error}`)}
}

export default {};
