export interface ICreateGear {

  categoryId: string;

  title: string;
  description: string;
  brand: string;
  pricePerDay: number;
  stock: number;
  available?: boolean;

  image?: string;
  specifications?: Record<string, any>;
}