import express from 'express';
import * as path from 'path';
import { PrismaClient } from '@prisma/client';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import session from 'express-session';
import bcrypt from 'bcrypt';
import authRouter from './auth';

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

const prisma = new PrismaClient();

const app = express();

app.use(express.json());

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(
  session({
    secret: 'my-key', 
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(async (username, password, done) => {

    
    const user = await prisma.user.findUnique({ where: { username: username } });
    if (!user) {
      return done(null, false, { message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return done(null, false, { message: 'Incorrect password' });
    }

    return done(null, user);
  })
);

passport.serializeUser((user: User, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use('/api', authRouter)


app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

app.get('/api/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





app.put('/api/:id', async (req, res) => {
  const { id } = req.params;
  const result = await prisma.user.update({
    where: { id: parseInt(id) },
    data: {
      ...req.body,
    },
  });
  res.json(result);
});

app.delete('/api/:id', async (req, res) => {
  const { id } = req.params;
  const result = await prisma.user.delete({
    where: { id: parseInt(id) },
  });
  res.json(result);
});

// not important for now
// app.get('/api/:id', async (req, res) => {
//   const { id } = req.params;
//   const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
//   res.json(user);
// }); 

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
