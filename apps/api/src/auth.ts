import express from 'express';
import { PrismaClient } from '@prisma/client';
import passport from 'passport';
import bcrypt from 'bcrypt';

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
          password: hashedPassword
        },
      });
  
      res.json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'the user already exist' });
    }
  });

authRouter.post('/login', passport.authenticate('local'), (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
  
    res.json({ message: 'Login successful', user: req.user });
  });
  

export default authRouter;
