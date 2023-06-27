export class BaseModel {}

export type Category = {
  id: number;
  name: string;
  size: number;
  url: string;
};

export type Product = {
  id: number;
  image: string;
  title: string;
  price: number;
  deals: number;
  star: number;
  url: string;
};

export type CartProduct = {
  id: number;
  image: string;
  title: string;
  price: number;
  quantity: number;
  url: string;
};
