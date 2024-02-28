import supertest = require('supertest');
import express = require('express');
import { PrismaClient } from '@prisma/client'; 
import { articleRouter } from './articles';

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use('/api', articleRouter);

let authToken: any; 

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Article Tests', () => {
  it('should create a new article with authentication', async () => {
    const response = await supertest(app)
      .post('/api/articles')
      .set('Authorization', `Bearer ${authToken}`)
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
