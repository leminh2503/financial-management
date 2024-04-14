export interface SigninModel {
  username: string;
  password: string;
}

export interface UserRegisterOrUpdateModel {
  password: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface DataResponse<T> {
  data: T;
  message: string;
  status: number;
  success: boolean;
}

export interface UserModel {
  userId?: number;
  image?: string;
  password?: string;
  username: string;
  phoneNumber?: number;
  fullName?: string;
  roleId?: number;
}

export interface Token {
  access_token: string;
  refresh_token: string;
}

export interface ProductModel {
  productId: number;
  productName: string;
  productPrice: number;
  productDescription: string;
  productImageId: string;
  productQuantity: number;
  productSKU: string;
  count: number;
}

export interface ImageModel {
  imageId: number | string;
  imagePath: string;
  imageName: string;
}

export interface ProductModelTest {
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
