import Order from './order';

export default class OrderBoard {
  constructor({ OrderClass = Order } = {}) {
    this.OrderClass = OrderClass;
    this.orders = [];
    this.nextOrderID = 0;
  }

  getOrders() {
    return this.orders;
  }

  register(params) {
    this.nextOrderID += 1;
    const orderParams = Object.assign(params, { ID: this.nextOrderID });
    const order = new this.OrderClass(orderParams);
    this.orders.push(order);
    return order.ID;
  }
}
