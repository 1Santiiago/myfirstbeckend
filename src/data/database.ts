import { User, Products } from "../types";

export const users: User[] = [
  { id: 1, name: "Santiago", email: "santiago@email.com" },
  { id: 2, name: "Maria", email: "maria@email.com" },
];




export const products : Products[] = [
    { id: 1, name: "Produto A", price: 10.99 },
    { id: 2, name: "Produto B", price: 19.99 },
    { id: 3, name: "Produto C", price: 5.49 },
];  




let nextProductId = 4;

let nextUserId = 3;

export function getNextUserId() {
  return nextUserId++;
}
export function getNextProductId() {
  return nextProductId++
}