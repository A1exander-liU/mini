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
  imageurl: string;
  category: ProductCategory;
  price: string;
};

export type MedicineCures =
  | 'paralysis'
  | 'sleep'
  | 'burn'
  | 'frozen'
  | 'none'
  | 'all';

export type Medicine = {
  health_recovery: number;
  pp_recovery: number;
  cures: MedicineCures;
};

export type CollectibleRarity = 'common' | 'rare' | 'very_rare' | 'legendary';

export type Collectible = {
  rarity: CollectibleRarity;
  tradeable: boolean;
};

export type HeldItemTarget = 'self' | 'enemy';
export type HeldItemEffect = 'stat' | 'recovery' | 'out_of_battle' | 'turn';
export type HeldItemActivation =
  | 'self_hit'
  | 'enemy_hit'
  | 'passive'
  | 'turn_start'
  | 'turn_end';

export type HeldItem = {
  target: HeldItemTarget;
  effect: HeldItemEffect;
  activation: HeldItemActivation;
};

export type CatchAdvantage = 'turn' | 'species' | 'type' | 'always' | 'none';

export type Ball = {
  catch_power: number;
  boosted_catch_power: number;
  advantage: CatchAdvantage;
};

export type ProductTypes = Medicine | Collectible | HeldItem | Ball;

export type FullProduct<T extends ProductTypes = ProductTypes> = Product & {
  details: T;
};

export type OneProductRes = BaseRes & { product: FullProduct };

export type CartItem = {
  id: number;
  userid: number;
  productid: number;
  quantity: number;
};

export type GetCartItemsRes = BaseRes & {
  cart: CartItem[];
};

export type OrderItem = {
  productId: number;
  quantity: number;
};

export type CreateOrderReq = {
  address: string;
  city: string;
  region?: string | null | undefined;
  country: string;
  postalCode?: string | null | undefined;
  orderItems: OrderItem[];
};

export type BasicOrder = {
  id: number;
  userid: number;
  createdat: string;
  address: string;
  city: string;
  region: string;
  country: string;
  postal_code: string;
};

export type FullOrderItem = OrderItem & {
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  price: string;
};

export type FullOrder = BasicOrder & {
  order_items: FullOrderItem[];
};

export type AllOrdersRes = BaseRes & {
  orders: BasicOrder[];
};

export type OneOrderRes = BaseRes & {
  order: FullOrder;
};
