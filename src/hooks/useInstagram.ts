import { useQuery } from 'react-query';
import axios from 'axios';
import type { Product } from '../types';

const api = axios.create({
  baseURL: '/api',
});

export function useInstagramPosts(category?: string) {
  return useQuery<Product[]>(
    ['posts', category],
    async () => {
      const { data } = await api.get<Product[]>(
        `/instagram/posts/${category}`
      );
      return data.map((post) => ({
        ...post,
        id: String(post.id),
        images: [...post.images],
        caption: String(post.caption),
        category: String(post.category),
        timestamp: String(post.timestamp),
      }));
    },
    {
      staleTime: 1000 * 60 * 5,
      retry: 3,
      refetchOnWindowFocus: false,
    }
  );
}
