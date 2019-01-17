export default class OrderInterface {
  constructor({ OrderBoardClass, OrderBoardViewClass }) {
    this.orderBoard = new OrderBoardClass();
    this.orderBoardView = new OrderBoardViewClass();
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
    console.log(this.orderBoardView.render(this.orderBoard));
  }
}
