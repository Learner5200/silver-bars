import AggregateOrder from './aggregateOrder';

export default class OrderBoardSummariser {
  constructor({
    AggregateOrderClass = AggregateOrder,
  } = {}) {
    this.AggregateOrderClass = AggregateOrderClass;
  }

  summarise({
    orderBoard,
    type,
  }) {
    const orderList = orderBoard.getOrders();
    const filteredOrders = this.filter({ orderList, type });
    const aggregateOrders = this.aggregateOrderList(filteredOrders);
    if (type === 'BUY') aggregateOrders.reverse();
    return aggregateOrders;
  }

  filter({
    orderList,
    type,
  }) {
    return orderList.filter(order => order.type === type);
  }

  aggregateOrderList(orders) {
    const groupedOrders = this.groupByPrice(orders);
    const prices = Object.keys(groupedOrders);
    return prices.map(price => new this.AggregateOrderClass({
      price: Number(price),
      quantity: groupedOrders[price],
    }));
  }

  groupByPrice(orders) {
    const reducer = (summary, order) => {
      const newSummary = summary;
      newSummary[order.price] = newSummary[order.price] + order.quantity || order.quantity;
      return newSummary;
    };
    return orders.reduce(reducer, {});
  }
}
