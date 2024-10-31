export interface Product {
  id: string;
  images: string[];
  caption: string;
  category: string;
  timestamp: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface InstagramPost {
  id: string;
  images: string[];
  caption: string;
  category: string;
  timestamp: string;
}