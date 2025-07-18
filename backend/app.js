import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth/auth.route.js'
import { authMiddleware } from './middleware/auth.js';
dotenv.config({path:'.env'});
import pool from './config/db.js';

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/auth',authRoutes);
app.use('/api',authMiddleware);

app.get('/api/home',(req,res) => {
    res.status(200).json({message : "Authorized successfully"});
})

app.listen(port,()=>console.log(`listening on ${port}`));
