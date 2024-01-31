import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET ?? 'default-secret-key';

export const auth = (req: Request, res: Response, next: any) => {
  try {
    const token = req.get('Authorization')?.split(' ')[1];

    if (!token) {
      return res.status(403).send({ error: 'Token missing!' });
    }

    const decoded = jwt.verify(token, TOKEN_SECRET);

    if (decoded) {
      // @ts-ignore
      req.decoded = decoded;
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Failed to verify JWT' });
  }
};
