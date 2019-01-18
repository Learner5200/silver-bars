export default class OrderBoardView {
  render(orderBoard) {
    const titleView = 'LIVE ORDER BOARD\n\n';
    const orderList = orderBoard.getOrders();
    const buySummary = this.summary({ orderList, type: 'BUY' });
    const sellSummary = this.summary({ orderList, type: 'SELL' });
    const buyView = this.summaryView({ summary: buySummary, type: 'BUY' });
    const sellView = this.summaryView({ summary: sellSummary, type: 'SELL' });
    return titleView + buyView + sellView;
  }

  summary({
    orderList,
    type,
  }) {
    const filteredOrders = this.filter({ orderList, type });
    const aggregatedOrders = this.aggregateByPrice(filteredOrders);
    return aggregatedOrders;
  }

  summaryView({
    summary,
    type,
  }) {
    const summaryHeader = `${type}:\n\n`;
    const prices = Object.keys(summary);
    if (type === 'BUY') prices.reverse();
    const summaryBody = prices.map(price => this.orderView(price, summary))
      .join('');
    return summaryHeader + summaryBody;
  }

  orderView(price, orderList) {
    return `${orderList[price]}kg for £${price}\n`;
  }

  filter({
    orderList,
    type,
  }) {
    return orderList.filter(order => order.type === type);
  }

  aggregateByPrice(orders) {
    const reducer = (summary, order) => {
      const newSummary = summary;
      newSummary[order.price] = newSummary[order.price] + order.quantity || order.quantity;
      return newSummary;
    };
    return orders.reduce(reducer, {});
  }
}
