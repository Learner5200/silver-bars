import OrderBoardView from '../src/orderBoardView';
import { buildOrderParams } from './helpers';

describe('OrderBoardView', () => {
  let fakeOrderBoard;
  let orderBoardView;
  class FakeSummariser {
    summarise({ type }) {
      if (type === 'BUY') {
        return [{ price: 2, quantity: 2 }, { price: 1, quantity: 1 }];
      }
      return [{ price: 10, quantity: 10 }, { price: 20, quantity: 20 }];
    }
  }
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
    it('renders outputs of summariser.summarise() in two lists ', () => {
      // const output = orderBoardView.render(fakeOrderBoard);
      // expect(output).toBe('LIVE ORDER BOARD\n\nBUY:\n\n1kg for £300\n1kg for £200\n\n');
    });
  });
});
