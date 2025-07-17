import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth/auth.route.js'
dotenv.config({path:'.env'});
import pool from './config/db.js';

const app = express();
const port = process.env.PORT ?? 3000;
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/auth',authRoutes);
app.get('/',()=>{
      if(pool) console.log('db conn established');
})
app.listen(port,()=>console.log(`listening on ${port}`));
