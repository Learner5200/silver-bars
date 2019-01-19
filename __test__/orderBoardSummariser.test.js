import OrderBoardSummariser from '../src/orderBoardSummariser';
import { buildOrderParams } from './helpers';

describe('OrderBoardSummariser', () => {
  let summariser;
  let fakeOrderBoard;
  let summary;
  class MockAggregateOrder {
    constructor({ quantity, price }) {
      this.quantity = quantity;
      this.price = price;
    }
  }

  beforeEach(() => {
    fakeOrderBoard = {
      getOrders: () => [
        buildOrderParams({
          quantity: 1,
          price: 100,
        }),
        buildOrderParams({
          quantity: 1,
          price: 100,
        }),
        buildOrderParams({
          quantity: 1,
          price: 200,
        }),
        buildOrderParams({
          quantity: 10,
          price: 1000,
          type: 'SELL',
        }),
        buildOrderParams({
          quantity: 10,
          price: 1000,
          type: 'SELL',
        }),
        buildOrderParams({
          quantity: 20,
          price: 2000,
          type: 'SELL',
        }),
      ],
    };
    summariser = new OrderBoardSummariser({ AggregateOrder: MockAggregateOrder });
    summary = summariser.summarise({
      orderBoard: fakeOrderBoard,
      type: 'BUY',
    });
  });

  describe('.summarise()', () => {
    it('returns array of aggregate orders', () => {
      expect(summary[0]).toBeInstanceOf(MockAggregateOrder);
    });
    it('aggregates orders at same price', () => {
      expect(summary.length).toBe(2);
      expect(summary[1].quantity).toBe(2);
    });

    describe('when type === BUY', () => {
      it('contains only BUY orders', () => {
        const sellOrders = summary.filter(order => order.quantity >= 10);
        expect(sellOrders).toEqual([]);
      });
      it('sorts descending by price', () => {
        expect(summary[0].price).toBeGreaterThan(summary[1].price);
      });
    });

    describe('when type === SELL', () => {
      beforeEach(() => {
        summary = summariser.summarise({
          orderBoard: fakeOrderBoard,
          type: 'SELL',
        });
      });
      it('contains only SELL orders', () => {
        const buyOrders = summary.filter(order => order.quantity < 10);
        expect(buyOrders).toEqual([]);
      });
      it('sorts ascending by price', () => {
        expect(summary[0].price).toBeLessThan(summary[1].price);
      });
    });
  });
});
