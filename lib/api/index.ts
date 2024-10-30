import { User, Post, PortfolioItem } from '@/types';

// Generic fetch function with error handling
async function fetchFromAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`/api${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {})
    }
  });
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

// User-related API calls
export const userAPI = {
  login: async (email: string, password: string): Promise<User> => {
    return fetchFromAPI<User>('/user', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
  getCurrentUser: async (): Promise<User | null> => {
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