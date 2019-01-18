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
  }
  class MockOrderBoardView {
    render() {
      return 'output';
    }
  }
  let params;

  beforeEach(() => {
    orderInterface = new OrderInterface({
      OrderBoardClass: MockOrderBoard,
      OrderBoardViewClass: MockOrderBoardView,
    });
    ({ orderBoard, orderBoardView } = orderInterface);
    params = buildOrderParams({});
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
      orderInterface.buy(params);
      expect(registerSpy).toHaveBeenCalledWith(registerParams);
    });
    it('returns the return value of OrderBoard.register() as order ID', () => {
      const id = orderInterface.buy(params);
      expect(id).toBe(1);
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
