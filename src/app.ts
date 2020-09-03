import express from 'express';
import * as dotenv from 'dotenv';
import { userRouter } from './routes/userRoutes';

dotenv.config();

const app: express.Application = express();

app.use(express.json());
app.use(userRouter);

app.listen(process.env.PORT, () => {
  console.log(`Listening at http://localhost:${process.env.PORT}`);
});
