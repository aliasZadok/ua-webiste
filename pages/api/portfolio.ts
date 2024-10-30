import { NextApiRequest, NextApiResponse } from 'next';
import { PortfolioItem } from '@/types';

const mockPortfolioItems: PortfolioItem[] = [
  {
    id: '1',
    title: 'Project 1',
    description: 'This is a description for Project 1',
    imageUrl: 'https://via.placeholder.com/300',
    projectUrl: '#',
  },
  {
    id: '2',
    title: 'Project 2',
    description: 'This is a description for Project 2',
    imageUrl: 'https://via.placeholder.com/300',
    projectUrl: '#',
  },
  {
    id: '3',
    title: 'Project 3',
    description: 'This is a description for Project 3',
    imageUrl: 'https://via.placeholder.com/300',
    projectUrl: '#',
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(mockPortfolioItems);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}