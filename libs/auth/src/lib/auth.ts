import express from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import passport from 'passport';

const prisma = new PrismaClient();
const authRouter = express.Router();

authRouter.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    res.json({ id: newUser.id });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'the user already exists' });
  }
});

authRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Authentication failed' });
    }``

    const token = jwt.sign({ id: user.id }, process.env['JWT_SECRET'] as string, {
      expiresIn: '1h',
    });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

authRouter.get('/me', passport.authenticate('jwt', { session: false }), async (req, res) => {
  res.send(req.user)
});
export { authRouter };
