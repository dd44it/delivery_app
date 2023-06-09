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
}

export interface HistoryOrder {
  finalPrice: number,
  products: Product[]
}