import { Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/user";


// GET /users — возвращает всех пользователей
// GET /users/:userId - возвращает пользователя по _id



export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ message: "Ошибка на стороне сервера" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      const error = new Error("Нет пользователя по заданному id");
      error.name = "NotFound";
      throw error;
    }

    return res.status(200).send(user);
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


export const createUser = async (req: Request, res: Response) => {
  try {

console.log(req.body);
    const { name, about, avatar } = req.body;
    if (!name || !about || !avatar)  {
      const error = new Error("Переданы не все обязательны поля");
      error.name = "CustomValid";
      throw error;
    }

    const newUser = await User.create(req.body);
    return res.status(201).send(newUser);
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

export const updateAvatar = async (req: Request, res: Response) => {
  try{console.log(req.body);}
  catch (error) { console.log(`Ошибка ${error}`)}
}

export const updateProfile = async (req: Request, res: Response) => {
  try{console.log(req.body);}
  catch (error) { console.log(`Ошибка ${error}`)}
}


export default {};
