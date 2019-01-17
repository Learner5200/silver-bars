import OrderBoard from '../src/orderBoard';
import { buildOrderParams } from './helpers';

describe('OrderBoard', () => {
  let orderBoard;
  let buyParams;
  let sellParams;
  class MockOrder {}

  beforeEach(() => {
    orderBoard = new OrderBoard({
      OrderClass: MockOrder,
    });
    buyParams = buildOrderParams({ type: 'BUY' });
    sellParams = buildOrderParams({ type: 'SELL' });
  });

  describe('.getOrders()', () => {
    it('begins empty', () => {
      expect(orderBoard.getOrders()).toEqual([]);
    });
  });

  describe('.register()', () => {
    let firstOrder;
    beforeEach(() => {
      orderBoard.register(buyParams);
      firstOrder = orderBoard.getOrders().first;
    });
    it('adds an order to orders with parameters specified', () => {
      expect(firstOrder.quantity).toEqual(buyParams.quantity);
      expect(firstOrder.price).toEqual(buyParams.price);
      expect(firstOrder.userID).toEqual(buyParams.userID);
      expect(firstOrder.type).toEqual(buyParams.type);
    });
    it('assigns unique serial ID to each order', () => {
      orderBoard.register(sellParams);
      const secondOrder = orderBoard.getOrders()[1];
      expect(firstOrder.ID).toEqual(1);
      expect(secondOrder.ID).toEqual(2);
    });
  });
});
