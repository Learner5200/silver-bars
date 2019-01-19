import OrderBoardClass from './orderBoard';
import OrderBoardViewClass from './orderBoardView';

export default class OrderInterface {
  constructor({
    OrderBoard = OrderBoardClass,
    OrderBoardView = OrderBoardViewClass,
  } = {}) {
    this.orderBoard = new OrderBoard();
    this.orderBoardView = new OrderBoardView();
  }

  buy({ quantity, price, userID }) {
    return this.orderBoard.register({
      quantity,
      price,
      userID,
      type: 'BUY',
    });
  }

  sell({ quantity, price, userID }) {
    return this.orderBoard.register({
      quantity,
      price,
      userID,
      type: 'SELL',
    });
  }

  cancel({ orderID }) {
    this.orderBoard.delete({ orderID });
  }

  display() {
    console.log(this.orderBoardView.render(this.orderBoard));
  }
}
