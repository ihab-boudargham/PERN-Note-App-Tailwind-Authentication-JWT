import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import notesRoutes from '../routes/notesRoutes';
import usersRoutes from '../routes/usersRoutes';
import { auth } from '../middleware/authMiddleware';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.use(cors());

app.use('/api/notes', auth, notesRoutes);
app.use('/api/users', usersRoutes);

// the following will let us get all the notes
// app.get('/', async (req, res) => {
//   const notes = await prisma.note.findMany();
//   // res.json({ message: 'Hello, World!' });
//   // res.send('Hello, World!');
//   res.json(notes);
// });

const port = 8000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
