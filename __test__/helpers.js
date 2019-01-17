export function buildOrderParams({
  quantity = 1,
  price = 100,
  userID = 'user1',
  type = undefined,
}) {
  return {
    quantity,
    price,
    userID,
    type,
  };
}
