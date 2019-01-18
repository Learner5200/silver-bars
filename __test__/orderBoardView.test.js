import OrderBoardView from '../src/orderBoardView';
import { buildOrderParams } from './helpers';

describe('OrderBoardView', () => {
  let fakeOrderBoard;
  let orderBoardView;
  beforeEach(() => {
    fakeOrderBoard = {
      getOrders: () => [
        buildOrderParams({
          price: 200,
        }),
        buildOrderParams({
          price: 300,
        }),
      ],
    };
    orderBoardView = new OrderBoardView();
  });

  describe('.render()', () => {
    it('renders BUY orders in descending price order', () => {
      const output = orderBoardView.render(fakeOrderBoard);
      expect(output).toBe('LIVE ORDER BOARD\n\nBUY:\n\n1kg for £300\n1kg for £200\n\n');
    });
  });
});
