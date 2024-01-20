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

    res.status(201).json({  });
  } catch (error) {
      console.error('Error creating article:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

articleRouter.get('/articles', async (req, res) => {
  try {
    const articles = await prisma.article.findMany({
      include: {
        author: false, 
      },
    });

    res.status(200).json(articles);
  } catch (error) {
      console.error('Error fetching articles:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

articleRouter.get('/articles/:id', async (req, res) => {
  const { id } = req.params;
  const numericId = parseInt(id);

  try {
    const article = await prisma.article.findUnique({
      where: { id: numericId },
      include: { author: false },
    });

    res.status(200).json(article);
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


articleRouter.put('/articles/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { id } = req.params;
  const numericId = parseInt(id);

  const { title, content } = req.body;

  try {
    const updatedArticle = await prisma.article.update({
      where: { id: numericId },
      data: {
        title,
        content,
      },
    });

    res.status(200).json({ message: 'Article updated successfully', article: updatedArticle });
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

articleRouter.delete('/articles/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { id } = req.params;
  const numericId = parseInt(id);

  try {
    await prisma.article.delete({
      where: { id: numericId },
    });

    res.status(200).json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



export default articleRouter;
