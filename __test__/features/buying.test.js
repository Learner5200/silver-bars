import OrderInterface from '../../src/orderInterface';

describe('Buying', () => {
  let orderInterface;
  beforeEach(() => {
    orderInterface = new OrderInterface();
  });
  test('user can register an order to buy silver bars and see this on the display', () => {
    orderInterface.buy({
      quantity: 3.5,
      price: 303,
      userID: 'user1',
    });
    const spy = jest.spyOn(console, 'log');
    orderInterface.display();
    expect(spy).toHaveBeenCalledWith('LIVE ORDER BOARD\n\nBUY:\n\n3.5kg for £303\n\n');
  });
  test('user can register an order to sell silver bars and see this on the display', () => {
    orderInterface.sell({
      quantity: 3.5,
      price: 303,
      userID: 'user1',
    });
    const spy = jest.spyOn(console, 'log');
    orderInterface.display();
    expect(spy).toHaveBeenCalledWith('LIVE ORDER BOARD\n\nSELL:\n\n3.5kg for £303\n\n');
  });
});
