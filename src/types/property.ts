export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  image?: string;
  createdAt: { seconds: number; nanoseconds: number };
  userId: string;
}