import axios from 'axios';
import { error } from 'console';

describe('POST: /api/register', () => {
  it('should create new user', async () => {
    const response = await axios.post('/api/register', {
      username: 'rah',
      email: 'rah',
      password: '123Rahaf',
    });

    expect(response.status).toBe(200);
    expect(response.data.id).toBeDefined();
    error('Error creating user:', error);
  });
  
});

describe('POST: /api/login', () => {
  it('should login with valid credentials', async () => {
    const response = await axios.post('/api/login', {
      username: 'rah',
      password: '123Rahaf',
    });

    expect(response.status).toBe(200);
    expect(response.data.token).toBeDefined();
  });

  it('should handle login error with invalid credentials', async () => {
    await expect(
      axios.post('/api/login', {
        username: 'nonexistentUser',
        password: 'invalidPassword',
      })
    ).rejects.toThrowError();
  });
});

