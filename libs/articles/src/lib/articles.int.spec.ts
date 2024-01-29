import supertest from 'supertest';
import express from 'express';
import { PrismaClient } from '@prisma/client'; 
import {articleRouter} from './articles';

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use('/api', articleRouter);

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Article Testde', () => {
  it('should create a new article', async () => {
    const response = await supertest(app)
      .post('/api/articles')
      .send({
        title: 'Test Article',
        content: 'This is a test article.',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'Article created successfully');
    expect(response.body.article).toHaveProperty('id');
    expect(response.body.article).toHaveProperty('title', 'Test Article');
    expect(response.body.article).toHaveProperty('content', 'This is a test article.');
  });

});
