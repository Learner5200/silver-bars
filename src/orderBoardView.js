import OrderBoardSummariser from './orderBoardSummariser';

export default class OrderBoardView {
  constructor({ SummariserClass = OrderBoardSummariser } = {}) {
    this.summariser = new SummariserClass();
  }

  render(orderBoard) {
    const titleView = 'LIVE ORDER BOARD\n\n';
    console.log(this.summariser)
    const buySummary = this.summariser.summarise({ orderBoard, type: 'BUY' });
    const sellSummary = this.summariser.summarise({ orderBoard, type: 'SELL' });
    const buyView = this.summaryView({ summary: buySummary, type: 'BUY' });
    const sellView = this.summaryView({ summary: sellSummary, type: 'SELL' });
    return titleView + buyView + sellView;
  }

  summaryView({
    summary,
    type,
  }) {
    const summaryHeader = `${type}:\n\n`;
    const summaryBody = summary.map(order => this.orderView(order))
      .join('');
    return summaryHeader + summaryBody;
  }

  orderView(order) {
    return `${order.quantity}kg for £${order.price}\n`;
  }
}
