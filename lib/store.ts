import { create } from 'zustand';
import { User, Post } from '../types';

interface AppState {
  user: User | null;
  posts: Post[];
  setUser: (user: User | null) => void;
  setPosts: (posts: Post[]) => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  posts: [],
  setUser: (user: User | null) => set({ user }),
  setPosts: (posts: Post[]) => set({ posts }),
}));