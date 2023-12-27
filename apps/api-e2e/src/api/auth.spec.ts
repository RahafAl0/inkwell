import axios from 'axios';
import { error } from 'console';

describe('POST: /api/register', () => {
  it('should create new user', async () => {
    const response = await axios.post('/api/register', {
      username: 'rahaaafRiyad',
      email: 'rahafrahaffffff@rahaf',
      password: '123Rahaf',
    });

    expect(response.status).toBe(200);
    expect(response.data.id).toEqual(4);
    error('Error creating user:', error);
  });
  
});
