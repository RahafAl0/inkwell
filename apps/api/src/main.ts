import express from 'express';
import { PrismaClient } from '@prisma/client';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { authRouter } from '@inkwell/auth';
import { articleRouter } from '@inkwell/articles';
import { commentRouter } from '@inkwell/comments'; 
import cors from 'cors';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

const prisma = new PrismaClient();

const app = express();

app.use(express.json());   
app.use('/assets', express.static(__dirname + '/assets'));
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

passport.use(
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: jwtPayload.id },
      });

      if (!user) {
        return done(null, false);
      }

      return done(null, {id: user.id, username: user.username, email: user.email });
    } catch (error) {
      return done(error);
    }
  })
);


app.use(passport.initialize());

app.use('/api', authRouter);
app.use('/api', articleRouter);
app.use('/api', commentRouter)

app.get('/api', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

app.get('/api/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
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

app.put('/api/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { id } = req.params;
  const result = await prisma.user.update({
    where: { id: parseInt(id) },
    data: {
      ...req.body,
    },
  });
  res.json(result);
});

app.delete('/api/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { id } = req.params;
  const result = await prisma.user.delete({
    where: { id: parseInt(id) },
  });
  res.json(result);
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
