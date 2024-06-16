import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import authRoutes from './routes/auth.js'
import notesRoutes from './routes/notes.js'

const app = express();

const PORT = 8000;

mongoose.connect('mongodb://localhost:27017/dbconnect'
).then(() => {
  console.log("Database connected successfully.");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
app.use(cors());
app.use(express.json());
app.use('/api/auth',authRoutes);
app.use('/api/notes', notesRoutes);


