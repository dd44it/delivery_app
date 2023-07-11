export interface Shop {
  shop_id: string;
  name: string;
  address: string;
  products: Product[];
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  count: number;
  shop: string;
  image_url: string;
}

export interface HistoryOrder {
  finalPrice: number,
  products: Product[]
}

export interface Coupon {
  shop_id: string;
  shop: string;
  coupon_code: string;
  count: number;
  percent: number;
}