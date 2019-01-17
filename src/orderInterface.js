export default class OrderInterface {
  constructor({ orderBoard }) {
    this.orderBoard = orderBoard;
  }

  buy({ quantity, price, userID }) {
    this.orderBoard.register({
      quantity,
      price,
      userID,
      type: 'BUY',
    });
  }
}
