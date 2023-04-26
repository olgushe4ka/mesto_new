import { Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/user";
import { RequestCustom } from "types";

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
    const { name, about, avatar } = req.body;
    if (!name || !about || !avatar) {
      const error = new Error("Переданы не все обязательные поля");
      error.name = "CustomValid";
      throw error;
    }

    const newUser = await User.create(req.body);
    return res.status(201).send(newUser);
  } catch (error) {
    if (error instanceof Error && error.name === "CustomValid") {
      return res.status(400).send({ message: error.message });
    }

    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send({ message: error.message });
    }

    return res.status(500).send({ message: "Ошибка на стороне сервера" });
  }
};

export const updateAvatar = async (req: RequestCustom, res: Response) => {
  try {
    await User.findByIdAndUpdate(req.user?._id, req.body, { new: true }).then(
      (user) => {
        if (!user) {
          const error = new Error("Нет user с таким id");
          error.name = "CustomValid";
          throw error;
        }
        const { avatar } = req.body;
        if (!avatar) {
          const error = new Error("Переданы не все обязательные данные");
          error.name = "CustomValid";
          throw error;
        }

        return res.status(201).send(user);
      }
    );
  } catch (error) {
    if (error instanceof Error && error.name === "CustomValid") {
      return res.status(400).send({ message: error.message });
    }

    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send({ message: error.message });
    }

    return res.status(500).send({ message: "Ошибка на стороне сервера" });
  }
};

export const updateProfile = async (req: RequestCustom, res: Response) => {
  try {
    await User.findByIdAndUpdate(req.user?._id, req.body, { new: true }).then(
      (user) => {
        if (!user) {
          const error = new Error("Нет user с таким id");
          error.name = "CustomValid";
          throw error;
        }
        const { about } = req.body;
        if (!about) {
          const error = new Error("Переданы не все обязательные данные");
          error.name = "CustomValid";
          throw error;
        }
        return res.status(201).send(user);
      }
    );
  } catch (error) {
    if (error instanceof Error && error.name === "CustomValid") {
      return res.status(400).send({ message: error.message });
    }

    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send({ message: error.message });
    }

    return res.status(500).send({ message: "Ошибка на стороне сервера" });
  }
};

export default {};
