import Order from '../src/order';
import { buildOrderParams } from './helpers';

describe('Order', () => {
  let order;
  let params;
  beforeEach(() => {
    params = buildOrderParams();
    order = new Order(params);
  });
  describe('properties', () => {
    it('has a quantity', () => {
      expect(order.quantity).toBe(1);
    });
    it('has a price', () => {
      expect(order.price).toBe(100);
    });
    it('has a userID', () => {
      expect(order.userID).toBe('user1');
    });
    it('has a type', () => {
      expect(order.type).toBe('BUY');
    });
    it('has an ID', () => {
      expect(order.ID).toBe(1);
    });
  });
});
