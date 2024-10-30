import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@/types';

// Mock user data for development
const mockUser: User = {
  id: '1',
  email: 'admin@example.com',
  name: 'Admin User'
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // TODO: Implement actual session checking logic
    // For now, return null to simulate no active session
    res.status(200).json(null);
  } else if (req.method === 'POST') {
    // Handle login
    const { email, password } = req.body;
    
    // TODO: Implement actual authentication
    // For now, accept any credentials and return mock user
    if (email && password) {
      res.status(200).json(mockUser);
    } else {
      res.status(400).json({ error: 'Email and password required' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}