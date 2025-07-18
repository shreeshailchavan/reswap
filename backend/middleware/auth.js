import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res
      .status(401)
      .json({ message: "Authorization token missing or malformed" });

  const token = authHeader.split(" ")[1];

  try {
    const secretKey = process.env.JWT_SECRET || "your-secret-key"; 
    const decoded = jwt.verify(token, secretKey); 
    req.user = decoded; 
    next(); 
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }

};



