export interface Product {
  id: string;
  images: string[];
  caption: string;
  category: string;
}

export type Category = {
  id: string;
  name: string;
  slug: string;
  icon: string;
};