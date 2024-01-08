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

type ProductTypes = Medicine | Collectible | HeldItem | Ball;

export type FullProduct<T extends ProductTypes = ProductTypes> = Product & {
  details: T;
};

export type OneProductRes = BaseRes & { product: FullProduct };
