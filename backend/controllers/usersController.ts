import { PrismaClient } from '@prisma/client';
import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const TOKEN_SECRET = process.env.TOKEN_SECRET ?? 'default-secret-key';
const prisma = new PrismaClient();

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  try {
    // @ts-ignore
    const userId = req.decoded?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

interface SignUpBody {
  name: string;
  email?: string;
  password?: string;
}

export const signUp: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingemail = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingemail) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const passwordHashed = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHashed,
      },
    });
    // before we respond to the fronted
    // we remove any sensitive information
    newUser['password'] = '';

    console.log(newUser);
    let token = jwt.sign({ userId: newUser.id }, TOKEN_SECRET, {
      expiresIn: '1h',
    });
    res
      .header('Authorization', 'Bearer ' + token)
      .status(200)
      .json({ message: `Signed In Successfully`, token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to Sign Up' });
  }
};

interface SignInBody {
  email: string;
  password: string;
}

export const signIn: RequestHandler<
  unknown,
  unknown,
  SignInBody,
  unknown
> = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await prisma.user.findUnique({ where: { email: email } });

    if (!user) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ error: 'Incorrect credentials' });
    }

    user['password'] = '';

    let token = jwt.sign({ user: user }, TOKEN_SECRET, { expiresIn: '1h' });
    res
      .header('Authorization', 'Bearer ' + token)
      .status(200)
      .json({ message: `Signed In Successfully`, token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to Sign In' });
  }
};

export const logOut: RequestHandler = (req, res) => {
  res.clearCookie('jwtToken');
  res.status(200).json({ message: 'Logged Out Successfully' });
};
