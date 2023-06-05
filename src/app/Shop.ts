export interface Shop {
  shop_id: string;
  name: string;
  address: string;
  products: Product[];
}

export interface Product {
  name: string;
  price: number;
}
