import SummariserClass from './orderBoardSummariser';

export default class OrderBoardView {
  constructor({ Summariser = SummariserClass } = {}) {
    this.summariser = new Summariser();
  }

  render(orderBoard) {
    let view = 'LIVE ORDER BOARD\n\n';
    const buySummary = this.summariser.summarise({ orderBoard, type: 'BUY' });
    const sellSummary = this.summariser.summarise({ orderBoard, type: 'SELL' });
    if (buySummary.length > 0) {
      view += this.summaryView({ summary: buySummary, type: 'BUY' });
    }
    if (sellSummary.length > 0) {
      view += this.summaryView({ summary: sellSummary, type: 'SELL' });
    }
    return view;
  }

  summaryView({
    summary,
    type,
  }) {
    const summaryHeader = `${type}:\n\n`;
    const summaryBody = summary.map(order => this.orderView(order))
      .join('');
    return summaryHeader + summaryBody + '\n';
  }

  orderView(order) {
    return `${order.quantity}kg for £${order.price}\n`;
  }
}
