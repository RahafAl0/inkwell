import express from 'express';
import passport from 'passport';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const articleRouter = express.Router();

articleRouter.post('/articles', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { title, content } = req.body;
    const userId = (req.user as { id: string }).id;

    try {
      const newArticle = await prisma.article.create({
        data: {
          title,
          content,
          author: { connect: { id: Number(userId) } },
        },
      });

      res.status(201).json({ message: 'Article created successfully', article: newArticle });
    } catch (error) {
      console.error('Error creating article:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

export default articleRouter;
