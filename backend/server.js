import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

// Middlewares
// app.use(cors());

app.use(cors({
  origin: 'https://quiz-competition-one.vercel.app', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);


// Connect Database and Run Server
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


app.get('/', (req, res) => {
  res.send('Backend server is running');
});

