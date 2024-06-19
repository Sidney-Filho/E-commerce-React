export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  promoPrice?: number
  image: string;
  category: string;
  rating: number;
}