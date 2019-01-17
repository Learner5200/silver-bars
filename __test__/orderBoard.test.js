import OrderBoard from '../src/orderBoard';

describe('OrderBoard', () => {
  let orderBoard;
  class MockOrder {}

  beforeEach(() => {
    orderBoard = new OrderBoard({
      OrderClass: MockOrder,
    });
  });

  describe('.getOrders()', () => {
    it('begins empty', () => {
      expect(orderBoard.getOrders()).toEqual([]);
    });
  });
});
