export default class OrderBoard {
  constructor({ OrderClass }) {
    this.OrderClass = OrderClass;
    this.orders = [];
  }

  getOrders() {
    return this.orders;
  }
}
