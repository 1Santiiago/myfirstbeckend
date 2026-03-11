//definindo as interface

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Products {
  id: number;
  name: string;
  price: number;
}
export type CreateUserBody = Omit<User, "id">;
export type CreateProductBody = Omit<Products, "id">;
