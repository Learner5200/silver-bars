import OrderInterface from '../src/orderInterface';
import { buildOrderParams, expectConsoleOutput } from './helpers';

describe('OrderInterface', () => {
  class MockOrderBoard {
    register() {
      return 1;
    }

    delete() {}
  }
  class MockOrderBoardView {
    render() {
      return 'output';
    }
  }
  let orderInterface;
  let orderBoard;
  let orderBoardView;
  let buyParams;
  let sellParams;

  beforeEach(() => {
    orderInterface = new OrderInterface({
      OrderBoard: MockOrderBoard,
      OrderBoardView: MockOrderBoardView,
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
      const registerSpy = jest.spyOn(orderBoard, 'register');
      orderInterface.buy(buyParams);
      expect(registerSpy).toHaveBeenCalledWith({
        price: 100,
        quantity: 1,
        userID: 'user1',
        type: 'BUY',
      });
    });
    it('returns the return value of OrderBoard.register() as order ID', () => {
      const id = orderInterface.buy(buyParams);
      expect(id).toBe(1);
    });
  });
  describe('.sell()', () => {
    it('registers a new order on order board of type "SELL"', () => {
      const registerSpy = jest.spyOn(orderBoard, 'register');
      orderInterface.sell(sellParams);
      expect(registerSpy).toHaveBeenCalledWith({
        price: 100,
        quantity: 1,
        userID: 'user1',
        type: 'SELL',
      });
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
      expectConsoleOutput({
        func: (() => orderInterface.display()),
        output: orderBoardView.render(orderBoard),
      });
    });
  });
});
