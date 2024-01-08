// Types for what body needed in requests
export type LoginReq = {
  username: string;
  password: string;
};

// Types for what data is returned at each endpoint
export type BaseRes = {
  statusCode: number;
  message: string | string[];
};

export type ErrorRes = {
  error: string;
} & BaseRes;

export type MeRes = {
  id: number;
  username: string;
  email: string;
};

export type ProductsRes = {
  products: Product[];
} & BaseRes;

// Sub types
export type ProductCategory = 'medicine' | 'collectible' | 'held_item' | 'ball';

export type Product = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  category: ProductCategory;
  price: string;
};
