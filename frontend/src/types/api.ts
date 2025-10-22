// API response types matching backend Pydantic models
export interface Item {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  condition: string;
  seller_id: string;
  seller_name: string;
  images: string[];
  tags: string[];
  distance: number;
  created_at: string;
  updated_at: string;
}

export interface ItemViewRequest {
  item_id: string;
  user_id?: string;
}

export interface ItemViewResponse {
  success: boolean;
  message: string;
  item?: Item;
}

export interface StorePageResponse {
  success: boolean;
  items: Item[];
  total_items: number;
  categories: string[];
}

export interface CategoriesResponse {
  categories: string[];
}

export interface ItemsByCategoryResponse {
  items: Item[];
  total: number;
}

export interface HealthResponse {
  status: string;
  message: string;
}
