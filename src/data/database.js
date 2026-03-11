let users = [
  { id: 1, name: "Santiago", email: "santiago@email.com" },
  { id: 2, name: "Maria", email: "maria@email.com" },
];


const products = [
    { id: 1, name: "Produto A", price: 10.99 },
    { id: 2, name: "Produto B", price: 19.99 },
    { id: 3, name: "Produto C", price: 5.49 },
];  


let nextUserId = 2;
let nextProductId = 3;

module.exports = {
    users,
    products,
    nextUserId,
    nextProductId
}