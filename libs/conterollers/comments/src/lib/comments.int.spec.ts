
import { PrismaClient } from "@prisma/client";
import supertest from 'supertest';
import express from 'express';
import { commentRouter } from "./comments";


const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use('/api', commentRouter);


beforeAll(async () => {
  await prisma.$connect()
});

afterAll(async () => {
  await prisma.$disconnect()
});

describe('Comment Test', () => {
  it('should write new comment', async () => {
    const response = await supertest(app)
      .post('/api/comments')
      .send({
        content: 'Comment Test',
        userId: 1,
        articleId: 1
      });
    

    expect(response.status).toBe(201);
    expect(response.body).toBe({ })
  })
})


