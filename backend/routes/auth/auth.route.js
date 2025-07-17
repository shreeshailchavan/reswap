import express from 'express';
import { validate } from '../../middleware/validate.js';
import { userSignUpSchema } from '../../validation/user.schema.js';
import { loginUser, registerUser } from '../../controller/auth/auth.controller.js';
const authRoutes = express.Router();

authRoutes.post('/register',validate(userSignUpSchema),registerUser);
authRoutes.post('/login',loginUser);

export default authRoutes;