'use client';

import { useState, useEffect } from 'react';
import { Post, PortfolioItem } from '@/types';
import { postAPI, portfolioAPI } from '@/lib/api';

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    postAPI.getPosts()
      .then(setPosts)
      .catch((err) => {
        console.error('Error fetching posts:', err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return { posts, loading, error };
};

export const usePortfolioItems = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    portfolioAPI.getPortfolioItems()
      .then(setItems)
      .catch((err) => {
        console.error('Error fetching portfolio items:', err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return { items, loading, error };
};