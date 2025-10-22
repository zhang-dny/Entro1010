import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiService } from '@/services/api';
import type { ItemViewRequest } from '@/types/api';

// Query keys
export const queryKeys = {
  store: ['store'] as const,
  item: (id: string) => ['item', id] as const,
  categories: ['categories'] as const,
  itemsByCategory: (category: string) => ['items', 'category', category] as const,
  health: ['health'] as const,
};

// Store page query
export function useStorePage() {
  return useQuery({
    queryKey: queryKeys.store,
    queryFn: ApiService.getStorePage,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (keep in cache longer)
    refetchOnWindowFocus: false, // Disable refetch on window focus
    refetchOnMount: false, // Don't refetch on component mount if data is fresh
    refetchOnReconnect: false, // Don't refetch on network reconnect
    retry: 2, // Reduce retry attempts
  });
}

// Individual item query
export function useItem(itemId: string) {
  return useQuery({
    queryKey: queryKeys.item(itemId),
    queryFn: () => ApiService.getItem(itemId),
    enabled: !!itemId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (keep in cache longer)
    refetchOnWindowFocus: false, // Disable refetch on window focus
    refetchOnMount: false, // Don't refetch on component mount if data is fresh
    refetchOnReconnect: false, // Don't refetch on network reconnect
    retry: 2, // Reduce retry attempts
  });
}

// Categories query
export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn: ApiService.getCategories,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (keep in cache longer)
    refetchOnWindowFocus: false, // Disable refetch on window focus
    refetchOnMount: false, // Don't refetch on component mount if data is fresh
    refetchOnReconnect: false, // Don't refetch on network reconnect
    retry: 2, // Reduce retry attempts
  });
}

// Items by category query
export function useItemsByCategory(category: string) {
  return useQuery({
    queryKey: queryKeys.itemsByCategory(category),
    queryFn: () => ApiService.getItemsByCategory(category),
    enabled: !!category,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (keep in cache longer)
    refetchOnWindowFocus: false, // Disable refetch on window focus
    refetchOnMount: false, // Don't refetch on component mount if data is fresh
    refetchOnReconnect: false, // Don't refetch on network reconnect
    retry: 2, // Reduce retry attempts
  });
}

// Health check query
export function useHealthCheck() {
  return useQuery({
    queryKey: queryKeys.health,
    queryFn: ApiService.healthCheck,
    refetchInterval: 2 * 60 * 1000, // 2 minutes (reduced from 30 seconds)
    retry: 1, // Reduce retry attempts
    staleTime: 1 * 60 * 1000, // 1 minute stale time
  });
}

// Track item view mutation
export function useTrackItemView() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (request: ItemViewRequest) => ApiService.trackItemView(request),
    onSuccess: (_data: any, variables: ItemViewRequest) => {
      // Invalidate item query to refresh data
      queryClient.invalidateQueries({ queryKey: queryKeys.item(variables.item_id) });
    },
  });
}

// Reset data mutation
export function useResetData() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ApiService.resetData,
    onSuccess: () => {
      // Invalidate all queries to refresh data
      queryClient.invalidateQueries();
    },
  });
}

// Manual refresh function
export function useRefreshStore() {
  const queryClient = useQueryClient();
  
  return () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.store });
    queryClient.invalidateQueries({ queryKey: queryKeys.categories });
  };
}
