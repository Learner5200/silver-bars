export default class OrderBoardView {
  render(orderBoard) {
    const titleView = 'LIVE ORDER BOARD\n\n';
    const orderList = orderBoard.getOrders();
    const buyView = this.orderListView({ orderList, type: 'BUY' });
    const sellView = this.orderListView({ orderList, type: 'SELL' });
    return titleView + buyView + sellView;
  }

  orderListView({
    orderList,
    type,
  }) {
    let orderListView = `${type}:\n\n`;
    const filteredList = this.filter({ orderList, type });
    if (filteredList.length === 0) return '';

    const summary = this.summarise(filteredList);
    const prices = Object.keys(summary);
    if (type === 'BUY') prices.reverse();

    prices.forEach((price) => {
      orderListView += `${summary[price]}kg for £${price}\n`;
    });
    orderListView += '\n';
    return orderListView;
  }

  filter({
    orderList,
    type,
  }) {
    return orderList.filter(order => order.type === type);
  }

  summarise(orders) {
    const reducer = (summary, order) => {
      const newSummary = summary;
      newSummary[order.price] = newSummary[order.price] + order.quantity || order.quantity;
      return newSummary;
    };
    return orders.reduce(reducer, {});
  }
}
