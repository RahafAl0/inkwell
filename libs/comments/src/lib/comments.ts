/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
import { PrismaClient } from '@prisma/client';
import passport from 'passport';


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

    res.status(201).json({  });
  } catch (error) {
    console.log('Error', error);
    res.status(500).json({ error: "Internal Server Error" })
  }
});  

commentRouter.get('/comments', async (req, res) => {
  try {
    const comments = await prisma.comment.findMany();

    res.status(200).json(comments);
  } catch (error) {
    console.log('Error fetching comments');
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

commentRouter.put('/comments/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { id } = req.params;
  const { content } = req.body

  try {
    const numericId = parseInt(id)
    const updateComment = await prisma.comment.update({
      where: { id: numericId },
      data: { content }
    });
    res.status(200).json({ message: 'Commment Update Successfully', comment: updateComment });
  } catch (error) {
    console.log('Error Updating Cooment', error);
    res.status(500).json({ error: 'Internal Server Error' })
  }

})

export { commentRouter };