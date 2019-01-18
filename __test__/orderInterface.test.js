import OrderInterface from '../src/orderInterface';
import { buildOrderParams } from './helpers';

describe('OrderInterface', () => {
  let orderInterface;
  let orderBoard;
  let orderBoardView;
  class MockOrderBoard {
    register() {
      return 1;
    }

    delete() {
    }
  }
  class MockOrderBoardView {
    render() {
      return 'output';
    }
  }
  let buyParams;
  let sellParams;

  beforeEach(() => {
    orderInterface = new OrderInterface({
      OrderBoardClass: MockOrderBoard,
      OrderBoardViewClass: MockOrderBoardView,
    });
    ({ orderBoard, orderBoardView } = orderInterface);
    buyParams = buildOrderParams({});
    sellParams = buildOrderParams({ type: 'SELL' });
  });

  describe('properties', () => {
    it('initializes with an instance of OrderBoardClass', () => {
      expect(orderBoard).toBeInstanceOf(MockOrderBoard);
    });
    it('initializes with an instance of OrderBoardViewClass', () => {
      expect(orderBoardView).toBeInstanceOf(MockOrderBoardView);
    });
  });

  describe('.buy()', () => {
    it('registers a new order on order board of type "BUY"', () => {
      const registerParams = {
        price: 100,
        quantity: 1,
        userID: 'user1',
        type: 'BUY',
      };
      const registerSpy = jest.spyOn(orderBoard, 'register');
      orderInterface.buy(buyParams);
      expect(registerSpy).toHaveBeenCalledWith(registerParams);
    });
    it('returns the return value of OrderBoard.register() as order ID', () => {
      const id = orderInterface.buy(buyParams);
      expect(id).toBe(1);
    });
  });
  describe('.sell()', () => {
    it('registers a new order on order board of type "SELL"', () => {
      const registerParams = {
        price: 100,
        quantity: 1,
        userID: 'user1',
        type: 'SELL',
      };
      const registerSpy = jest.spyOn(orderBoard, 'register');
      orderInterface.sell(sellParams);
      expect(registerSpy).toHaveBeenCalledWith(registerParams);
    });
    it('returns the return value of OrderBoard.register() as order ID', () => {
      const id = orderInterface.sell(sellParams);
      expect(id).toBe(1);
    });
  });

  describe('.cancel()', () => {
    it('asks the orderBoard to delete the order', () => {
      const deleteSpy = jest.spyOn(orderBoard, 'delete');
      orderInterface.cancel({ orderID: 1 });
      expect(deleteSpy).toHaveBeenCalledWith({ orderID: 1 });
    });
  });

  describe('.display()', () => {
    it('asks orderBoardView to render orderBoard and logs the output to the console', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      const output = orderBoardView.render(orderBoard);
      orderInterface.display();
      expect(consoleSpy).toHaveBeenCalledWith(output);
    });
  });
});
