import OrderInterface from '../../src/orderInterface';
import { buildOrderParams } from '../helpers';

describe('Buying', () => {
  let orderInterface;
  beforeEach(() => {
    orderInterface = new OrderInterface();
  });
  test('user can register orders to buy silver bars and see them in descending price order on the display', () => {
    orderInterface.buy(buildOrderParams());
    orderInterface.buy(buildOrderParams({ quantity: 2, price: 200 }));
    const spy = jest.spyOn(console, 'log');
    orderInterface.display();
    expect(spy).toHaveBeenCalledWith('LIVE ORDER BOARD\n\nBUY:\n\n2kg for £200\n1kg for £100\n\n');
  });
  test('user can register orders to sell silver bars and see them in ascending price order on the display', () => {
    orderInterface.sell(buildOrderParams());
    orderInterface.sell(buildOrderParams({ quantity: 2, price: 200 }));
    const spy = jest.spyOn(console, 'log');
    orderInterface.display();
    expect(spy).toHaveBeenCalledWith('LIVE ORDER BOARD\n\nSELL:\n\n1kg for £100\n2kg for £200\n\n');
  });
  test('different users can register orders to buy silver bars at the same price and see them aggregated in the display', () => {
    orderInterface.buy(buildOrderParams());
    orderInterface.buy(buildOrderParams({ quantity: 2, userID: 'user2' }));
    const spy = jest.spyOn(console, 'log');
    orderInterface.display();
    expect(spy).toHaveBeenCalledWith('LIVE ORDER BOARD\n\nBUY:\n\n3kg for £100\n\n');
  });
  test('different users can register orders to sell silver bars at the same price and see them aggregated in the display', () => {
    orderInterface.sell(buildOrderParams());
    orderInterface.sell(buildOrderParams({ quantity: 2, userID: 'user2' }));
    const spy = jest.spyOn(console, 'log');
    orderInterface.display();
    expect(spy).toHaveBeenCalledWith('LIVE ORDER BOARD\n\nSELL:\n\n3kg for £100\n\n');
  });
  test('user can both buy and sell silver bars and see them in separate places on the display', () => {
    orderInterface.buy(buildOrderParams());
    orderInterface.sell(buildOrderParams({ price: 200 }));
    const spy = jest.spyOn(console, 'log');
    orderInterface.display();
    expect(spy).toHaveBeenCalledWith('LIVE ORDER BOARD\n\nBUY:\n\n1kg for £100\n\nSELL:\n\n1kg for £200\n\n');
  });
  test('user can cancel order and not see it on display', () => {
    orderInterface.buy(buildOrderParams());
    orderInterface.buy(buildOrderParams({ quantity: 2, price: 200 }));
    orderInterface.cancel({ orderID: 1 });
    const spy = jest.spyOn(console, 'log');
    orderInterface.display();
    expect(spy).toHaveBeenCalledWith('LIVE ORDER BOARD\n\nBUY:\n\n2kg for £200\n\n');
  });
});
