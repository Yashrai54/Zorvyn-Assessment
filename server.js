import express from 'express';
import connectDB from './config/connectDB.js';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import recordRouter from './routes/records.route.js';
dotenv.config();

const app = express();
app.use(express.json());

app.use('/api', userRouter);
app.use('/api', recordRouter);

connectDB();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});