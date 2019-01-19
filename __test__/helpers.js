export function buildOrderParams({
  quantity = 1,
  price = 100,
  userID = 'user1',
  type = 'BUY',
  ID = 1,
} = {}) {
  return {
    quantity,
    price,
    userID,
    type,
    ID,
  };
}

export function expectConsoleOutput({ func, output }) {
  const spy = jest.spyOn(console, 'log');
  func();
  expect(spy).toHaveBeenCalledWith(output);
}
