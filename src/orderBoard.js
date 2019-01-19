import OrderClass from './order';

export default class OrderBoard {
  constructor({ Order = OrderClass } = {}) {
    this.Order = Order;
    this.orders = [];
    this.currentOrderID = 0;
  }

  getOrders() {
    return this.orders;
  }

  register(params) {
    const orderParams = Object.assign(params, { ID: this.nextOrderID() });
    const order = new this.Order(orderParams);
    this.orders.push(order);
    return order.ID;
  }

  delete({ orderID }) {
    this.orders = this.orders.filter(order => order.ID !== orderID);
  }

  nextOrderID() {
    this.currentOrderID += 1;
    return this.currentOrderID;
  }
}
