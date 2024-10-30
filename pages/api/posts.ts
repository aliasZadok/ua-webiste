import { NextApiRequest, NextApiResponse } from 'next';
import { Post } from '@/types';

const mockPosts: Post[] = [
  {
    id: '1',
    title: 'First Post',
    content: 'This is the first post content.',
    authorId: 'user1',
    createdAt: new Date().toISOString(),
  },
  // Add more mock posts as needed
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(mockPosts);
  } else if (req.method === 'POST') {
    const newPost: Post = {
      ...req.body,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    mockPosts.push(newPost);
    res.status(201).json(newPost);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}