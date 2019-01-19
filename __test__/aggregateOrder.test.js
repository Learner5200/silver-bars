import AggregateOrder from '../src/aggregateOrder';
import { buildOrderParams } from './helpers';

describe('aggregatedOrdersOrder', () => {
  let params;
  let order;
  beforeEach(() => {
    params = buildOrderParams({
      price: 200,
      quantity: 5,
    });
    order = new AggregateOrder(params);
  });
  describe('properties', () => {
    it('has a quantity', () => {
      expect(order.quantity).toBe(5);
    });
    it('has a price', () => {
      expect(order.price).toBe(200);
    });
  });
});
