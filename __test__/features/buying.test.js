describe('Buying', () => {
  let orderInterface;
  beforeEach(() => {
    orderInterface = new OrderInterface();
  });
  test('user can register an order to buy silver bars', () => {
    orderInterface.buy({
      quantity: 3.5,
      price: 303,
      userID: 'user1',
    });
    const spy = jest.spyOn(console, 'log');
    orderInterface.display();
    expect(spy).toHaveBeenCalledWith('LIVE ORDER BOARD\n\nBUY:\n\n3.5kg for £303\n\nSELL:');
  });
});
