
import express, { NextFunction, Request, Response, json } from 'express';
import mongoose from 'mongoose';
import router from './routes/index';
import { RequestCustom } from 'types';



const app = express();
app.use(json());

app.use(router);


const port = 3000;
// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });



app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
  res.send(req);
});


//import { MongoClient } from 'mongodb';


// MongoClient.connect(mongoUrl, { useUnifiedTopology: any })
//   .then((client) => {
//     const db = client.db(dbName);
//     console.log(`Connected to MongoDB at ${mongoUrl}`);

//     // Здесь можно выполнять операции с базой данных

//     app.listen(3000, () => {
//       console.log('App is listening on port 3000');
//     });
//   })
//   .catch((err) => {
//     console.error(`Failed to connect to MongoDB at ${mongoUrl}`);
//     console.error(err);
//     process.exit(1);
//   });



  // const mongoUrl = 'mongodb://localhost:27017';

  //const dbName = 'mestodb';

 // const client = new MongoClient(mongoUrl);


mongoose.connect('mongodb://localhost:27017/mestodb');


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



// app.use((req, res, next) => {
//   req.user = {
//     _id: '6447d194d5c76f2b2771f4dc' // вставьте сюда _id созданного в предыдущем пункте пользователя
//   };

//   next();
// });



app.use((req: Request, res: Response, next: NextFunction) => {
  const reqCustom = req as RequestCustom;
  reqCustom.user = {
    _id: "6447d194d5c76f2b2771f4dc",
  };

  next();
});


connect();
