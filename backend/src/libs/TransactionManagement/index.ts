class TransactionManagement {

  orderByDay(transactions: any) {
    const dateFormat = new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit' });

    const orderByDate: any = {};
    const orderedTransactions = [];

    for (const transaction of transactions) {
      const dateTitle = dateFormat.format(transaction.date);
      if (orderByDate && orderByDate[dateTitle]?.records) {
        orderByDate[dateTitle]?.records.push(transaction);
        continue;
      }

      orderByDate[dateTitle] = {
        date: dateTitle,
        records: [transaction],
      };
    }

    for (const key in orderByDate) {
      orderedTransactions.push(orderByDate[key]);
    }

    return orderedTransactions;
  }
}

export default TransactionManagement;
