import express from 'express';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();
const commentRouter = express.Router()

commentRouter.post('/comments', async (req, res) => {
  const { content, userId, articleId } = req.body;

  try {
    const newComment = await prisma.comment.create({
      data: {
        content,
        userId,
        articleId,
      },
    });

    res.status(201).json({ comment: newComment });
  } catch (error) {
    console.log('Error', error);
    res.status(500).json({ error: "Internal Server Error" })
  }
});  

export { commentRouter };