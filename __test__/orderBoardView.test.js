import OrderBoardView from '../src/orderBoardView';
import { buildOrderParams } from './helpers';

describe('OrderBoardView', () => {
  class FakeSummariser {
    summarise({ type }) {
      if (type === 'BUY') {
        return [{ price: 2, quantity: 2 }, { price: 1, quantity: 1 }];
      }
      return [{ price: 10, quantity: 10 }, { price: 20, quantity: 20 }];
    }
  }
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
    orderBoardView = new OrderBoardView({ SummariserClass: FakeSummariser });
  });

  describe('.render()', () => {
    it('asks its summariser to summarise its orderBoard', () => {
      const summariseSpy = jest.spyOn(orderBoardView.summariser, 'summarise');
      orderBoardView.render(fakeOrderBoard);
      expect(summariseSpy).toHaveBeenCalledWith({
        orderBoard: fakeOrderBoard,
        type: 'BUY',
      });
    });
    it('formats outputs of summariser.summarise() in two lists ', () => {
      const output = orderBoardView.render(fakeOrderBoard);
      expect(output).toBe('LIVE ORDER BOARD\n\nBUY:\n\n2kg for £2\n1kg for £1\n\nSELL:\n\n10kg for £10\n20kg for £20\n\n');
    });
    it('does not display sales if there are no sales', () => {
      orderBoardView.summariser.summarise = ({ type }) => {
        if (type === 'BUY') {
          return [{ price: 2, quantity: 2 }, { price: 1, quantity: 1 }];
        }
        return [];
      };
      const output = orderBoardView.render(fakeOrderBoard);
      expect(output).toBe('LIVE ORDER BOARD\n\nBUY:\n\n2kg for £2\n1kg for £1\n\n');
    });
  });
});
