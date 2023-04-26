import express, { NextFunction, Request, Response, json } from "express";
import mongoose from "mongoose";
import router from "./routes/index";
import { RequestCustom } from "types";

const app = express();
app.use(json());

const port = 3000;

app.use((req: Request, res: Response, next: NextFunction) => {
  const reqCustom = req as RequestCustom;
  reqCustom.user = {
    _id: "6447d194d5c76f2b2771f4dc",
  };
  next();
});

app.use(router);

async function connect() {
  try {
    mongoose.set("strictQuery", true);
    await app.listen(port, () => {
      console.log("Server listeting on port", port);
    });
    await mongoose.connect("mongodb://localhost:27017/mestodb");
  } catch (error) {
    if (error instanceof mongoose.Error.MongooseServerSelectionError) {
      console.log("Ошибка подключения к базе данных");
    }
    console.log("Ошибка запуска сервера", error);
  }
}

connect();
