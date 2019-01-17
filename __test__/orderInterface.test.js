import OrderInterface from '../src/orderInterface';

describe('OrderInterface', () => {
  let orderInterface;
  let mockOrderBoard;
  let buyParams;
  beforeEach(() => {
    mockOrderBoard = {
      register() {
        return 1;
      },
    };
    orderInterface = new OrderInterface({
      orderBoard: mockOrderBoard,
    });
    buyParams = {
      quantity: 1,
      price: 100,
      userID: 'user1',
    };
  });
  describe('when buying silver bars', () => {
    it('registers a new order on order board of type "BUY"', () => {
      const registerParams = Object.assign(buyParams, { type: 'BUY' });
      const registerSpy = jest.spyOn(mockOrderBoard, 'register');
      orderInterface.buy(buyParams);
      expect(registerSpy).toHaveBeenCalledWith(registerParams);
    });
    it('returns the return value of OrderBoard.register() as order ID', () => {
      const id = orderInterface.buy(buyParams);
      expect(id).toBe(1);
    });
  });
});
