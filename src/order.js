export default class Order {
  constructor({ quantity, price, userID, type, ID }) {
    this.quantity = quantity;
    this.price = price;
    this.userID = userID;
    this.type = type;
    this.ID = ID;
  }
}
