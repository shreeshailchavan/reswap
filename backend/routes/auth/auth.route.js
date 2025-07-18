import express from 'express';
import { validate } from '../../middleware/validate.js';
import { userSignUpSchema } from '../../validation/user.schema.js';
import { loginUser, registerUser } from '../../controller/auth/auth.controller.js';
const authRoutes = express.Router();

authRoutes.post('/signup',validate(userSignUpSchema),registerUser);
authRoutes.post('/signin',loginUser);

export default authRoutes;