export const sortedTransactions = [
  {
    _id: '64b202e047c659520f597e2d',
    amount: 5.26,
    category: 'Food',
    description: 'Burge king',
    type: 'expenses',
    date: new Date('2023-07-13T04:00:00.000Z'),
  },
];

export const orderedTransactions = [
  {
    date: 'Jul 13',
    records: [
      {
        _id: '64b202e047c659520f597e2d',
        amount: 5.26,
        category: 'Food',
        description: 'Burge king',
        type: 'expenses',
        date: new Date('2023-07-13T04:00:00.000Z'),
      },
    ],
  },
];

export const getTransaction = {
  _id: '64b202e047c659520f597r2d',
  userId: "64b202e047c659520f597c2d",
  amount: 10,
  category: 'Health',
  description: 'Macdonals',
  type: 'expenses',
  date: new Date('2023-10-13T04:00:00.000Z'),
};

export const getTransactionDeleted = {
  _id: '64b202e047c659520f597r2d',
  userId: "64b202e047c659520f597c2d",
  amount: 10,
  category: 'Health',
  description: 'Macdonals',
  type: 'expenses',
  date: new Date('2023-10-13T04:00:00.000Z'),
  _v: 0
};
