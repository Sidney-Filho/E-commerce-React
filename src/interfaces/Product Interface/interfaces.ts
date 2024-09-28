export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  promoPrice?: number
  image: string;
  imageUrl: string;
  category: string;
  rating: number;
  quantity?: number;
}