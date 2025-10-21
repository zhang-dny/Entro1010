import type { 
  ItemViewRequest, 
  ItemViewResponse, 
  StorePageResponse, 
  CategoriesResponse, 
  ItemsByCategoryResponse,
  HealthResponse 
} from '@/types/api';

// API configuration
const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:8000';

class ApiError extends Error {
  status: number;
  
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

// Generic fetch wrapper with error handling
async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }));
      throw new ApiError(response.status, errorData.detail || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(0, error instanceof Error ? error.message : 'Network error');
  }
}

// API service class
export class ApiService {
  // Health check
  static async healthCheck(): Promise<HealthResponse> {
    return fetchApi<HealthResponse>('/');
  }

  // Get store page with all items
  static async getStorePage(): Promise<StorePageResponse> {
    return fetchApi<StorePageResponse>('/api/store');
  }

  // Get specific item details
  static async getItem(itemId: string): Promise<ItemViewResponse> {
    return fetchApi<ItemViewResponse>(`/api/item/${itemId}`);
  }

  // Track item view
  static async trackItemView(request: ItemViewRequest): Promise<ItemViewResponse> {
    return fetchApi<ItemViewResponse>('/api/item/view', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  // Get all categories
  static async getCategories(): Promise<CategoriesResponse> {
    return fetchApi<CategoriesResponse>('/api/categories');
  }

  // Get items by category
  static async getItemsByCategory(category: string): Promise<ItemsByCategoryResponse> {
    return fetchApi<ItemsByCategoryResponse>(`/api/items/category/${encodeURIComponent(category)}`);
  }

  // Reset all data (for testing)
  static async resetData(): Promise<{ message: string }> {
    return fetchApi<{ message: string }>('/api/reset', {
      method: 'DELETE',
    });
  }
}

export { ApiError };
