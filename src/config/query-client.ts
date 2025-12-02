import { QueryClient } from '@tanstack/react-query';
import { log } from '../services/log-service';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
      onError: (error) => {
        log({
          message: 'A mutation has failed',
          metadata: { error },
        });
      },
    },
  },
});
