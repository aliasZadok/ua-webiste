import { User, Post, PortfolioItem } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

// Generic fetch function with error handling
async function fetchFromAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

// User-related API calls
export const userAPI = {
  login: async (email: string, password: string): Promise<User> => {
    // TODO: Implement actual login logic
    return fetchFromAPI<User>('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
  getCurrentUser: async (): Promise<User | null> => {
    // TODO: Implement actual user fetching logic
    return fetchFromAPI<User | null>('/user');
  },
};

// Post-related API calls
export const postAPI = {
  getPosts: async (): Promise<Post[]> => {
    // TODO: Implement actual post fetching logic
    return fetchFromAPI<Post[]>('/posts');
  },
  createPost: async (post: Omit<Post, 'id'>): Promise<Post> => {
    // TODO: Implement actual post creation logic
    return fetchFromAPI<Post>('/posts', {
      method: 'POST',
      body: JSON.stringify(post),
    });
  },
};

// Portfolio-related API calls
export const portfolioAPI = {
  getPortfolioItems: async (): Promise<PortfolioItem[]> => {
    // TODO: Implement actual portfolio item fetching logic
    return fetchFromAPI<PortfolioItem[]>('/portfolio');
  },
};