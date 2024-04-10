export interface SigninModel {
  email: string;
  password: string;
}

export interface UserRegisterOrUpdateModel {
  password: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface UserModel {
  id: number;
  image: string;
  username: string;
  phoneNumber: number;
  fullName?: string;
  role?: string;
}

export interface Token {
  access_token: string;
  refresh_token: string;
}

export interface ProductModel {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  quantity: number;
  code: string;
  count: number;
}

export interface InvoiceModel {
  id: number;
  total: number;
  user: UserModel;
  products: ProductModel[];
  created_at: string;
  updated_at: string;
}
