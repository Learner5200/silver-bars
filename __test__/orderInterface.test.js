import OrderInterface from '../src/orderInterface';

describe('OrderInterface', () => {
  let orderInterface;
  let mockOrderBoard;
  beforeEach(() => {
    orderInterface = new OrderInterface();
    mockOrderBoard = {
      register() {},
    };
  });
  describe('when buying silver bars', () => {
    it('registers a new order on order board of type "BUY"', () => {
      const buyParams = {
        quantity: 3.5,
        price: 303,
        userID: 'user1',
      };
      const registerParams = Object.assign(buyParams, { type: 'BUY' });
      const registerSpy = jest.spyOn(mockOrderBoard, 'register');
      orderInterface.buy(buyParams);
      expect(registerSpy).toHaveBeenCalledWith(registerParams);
    });
  });
});
