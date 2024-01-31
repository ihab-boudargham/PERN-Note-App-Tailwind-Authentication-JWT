import { PrismaClient } from '@prisma/client';
import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();
const TOKEN_SECRET = process.env.TOKEN_SECRET ?? 'default-secret-key';

export const getNotes: RequestHandler = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Access denied. Token missing.' });
    }

    const decoded: any = jwt.verify(token, TOKEN_SECRET);
    const userId = decoded.user.id;

    const notes = await prisma.note.findMany({
      where: {
        userId: userId,
      },
    });

    res.json(notes);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'Internal Server Error. Could not return notes' });
  }
};

export const getNote: RequestHandler = async (req, res) => {
  const noteId = parseInt(req.params.noteId); // Convert the note ID to a number

  try {
    if (!noteId) {
      return res.status(400).json({ error: 'Note doesnot exist' });
    }

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Access denied. Token missing.' });
    }

    if (!Number.isInteger(noteId)) {
      return res.status(400).json({ error: 'Note doesnot exist' });
    }

    const decoded: any = jwt.verify(token, TOKEN_SECRET);
    const userId = decoded.user.id;

    const note = await prisma.note.findUnique({
      where: {
        id: noteId,
      },
    });

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json(note);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'Internal Server Error. Could not return note' });
  }
};

export const createNote: RequestHandler<
  {},
  {},
  {
    title: string;
    content: string;
    category: string;
    priority: string;
  }
> = async (req, res) => {
  const { title, content, category, priority } = req.body;

  try {
    if (!title || !content || !category || !priority) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Access denied. Token missing.' });
    }

    const decoded = jwt.verify(token, TOKEN_SECRET);
    const userId = (decoded as any).user.id;

    const note = await prisma.note.create({
      data: {
        title,
        content,
        category,
        priority,
        userId: userId,
      },
    });

    res.status(201).json(note);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'Internal Server Error. Could not create note' });
  }
};

export const updateNote: RequestHandler<
  { noteId: string },
  {},
  { title: string; content: string; category: string; priority: string }
> = async (req, res) => {
  const noteId = parseInt(req.params.noteId);
  const { title, content, category, priority } = req.body;

  try {
    if (!Number.isInteger(noteId)) {
      return res.status(400).json({ error: 'Invalid note ID' });
    }

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Access denied. Token missing.' });
    }

    const decoded: any = jwt.verify(token, TOKEN_SECRET);
    const userId = decoded.user.id;

    const existingNote = await prisma.note.findUnique({
      where: {
        id: noteId,
      },
    });

    if (!existingNote) {
      return res.status(400).json({ error: 'Note does not exist' });
    }

    if (existingNote.userId !== userId) {
      return res.status(403).json({
        error: 'Access denied. User not authorized to delete this note.',
      });
    }

    const updatedNote = await prisma.note.update({
      where: {
        id: noteId,
      },
      data: {
        title,
        content,
        category,
        priority,
      },
    });

    res.json(updatedNote);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'Internal Server Error. Could not update note' });
  }
};

export const deleteNote: RequestHandler = async (req, res) => {
  try {
    const noteId = parseInt(req.params.noteId);

    if (!Number.isInteger(noteId)) {
      return res.status(400).json({ error: 'Invalid note ID' });
    }

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Access denied. Token missing.' });
    }

    const decoded = jwt.verify(token, TOKEN_SECRET);
    const userId = (decoded as any).user.id;

    const existingNote = await prisma.note.findUnique({
      where: {
        id: noteId,
      },
    });

    if (!existingNote) {
      return res.status(400).json({ error: 'Note does not exist' });
    }

    if (existingNote.userId !== userId) {
      return res.status(403).json({
        error: 'Access denied. User not authorized to update this note.',
      });
    }

    await prisma.note.delete({
      where: {
        id: noteId,
      },
    });

    res.status(200).json({ error: 'Note deleted successfully' }).send();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'Internal Server Error. Could not delete note' });
  }
};
