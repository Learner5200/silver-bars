import OrderBoard from './orderBoard';
import OrderBoardView from './orderBoardView';

export default class OrderInterface {
  constructor({ OrderBoardClass = OrderBoard, OrderBoardViewClass = OrderBoardView } = {}) {
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

  sell({ quantity, price, userID }) {
    return this.orderBoard.register({
      quantity,
      price,
      userID,
      type: 'SELL',
    });
  }

  display() {
    console.log(this.orderBoardView.render(this.orderBoard));
  }
}
