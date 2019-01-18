import OrderInterface from '../../src/orderInterface';
import { buildOrderParams } from '../helpers';

describe('Buying', () => {
  let orderInterface;
  beforeEach(() => {
    orderInterface = new OrderInterface();
  });
  test('user can register an order to buy silver bars and see this on the display', () => {
    orderInterface.buy(buildOrderParams());
    const spy = jest.spyOn(console, 'log');
    orderInterface.display();
    expect(spy).toHaveBeenCalledWith('LIVE ORDER BOARD\n\nBUY:\n\n1kg for £100\n\n');
  });
  test('user can register an order to sell silver bars and see this on the display', () => {
    orderInterface.sell(buildOrderParams());
    const spy = jest.spyOn(console, 'log');
    orderInterface.display();
    expect(spy).toHaveBeenCalledWith('LIVE ORDER BOARD\n\nSELL:\n\n1kg for £100\n\n');
  });
  test('user can both buy and sell silver bars and see them in separate places on the display', () => {
    orderInterface.buy(buildOrderParams());
    orderInterface.sell(buildOrderParams({ price: 200 }));
    const spy = jest.spyOn(console, 'log');
    orderInterface.display();
    expect(spy).toHaveBeenCalledWith('LIVE ORDER BOARD\n\nBUY:\n\n1kg for £100\n\nSELL:\n\n1kg for £200\n\n');
  });
});
