export interface IShop {
  _id: number;
  shopName: string;
}

export interface IShops {
  shops: IShop[];
}

export interface IProduct {
  _id: string;
  productName: string;
  shop: string;
  quantity: number;
  price: number;
  image: string;
}

export interface IProducts {
  products: IProduct[];
}

export interface IUser {
  email: string;
  name: string;
  id: string;
}

export interface AuthResponse {
  accesToken: string;
  refreshToken: string;
  user: IUser;
}

export interface IOrder {
  _id: string;
  totalPrice: number;
  shop: string;
  products: IProduct[];
}