export default class OrderInterface {
  constructor({ orderBoard }) {
    this.orderBoard = orderBoard;
  }

  buy({ quantity, price, userID }) {
    return this.orderBoard.register({
      quantity,
      price,
      userID,
      type: 'BUY',
    });
  }

  display() {
    console.log(this.orderBoard.view.render());
  }
}
