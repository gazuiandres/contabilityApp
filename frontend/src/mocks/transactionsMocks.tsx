const transactions = {
  totalIncome: 1000,
  totalExpensives: 500,
  transactions: [
    {
      date: "jun 03",
      records: [
        {
          uuid: "jadja",
          category: "salary",
          description: "Rewards from work",
          value: 100.0,
          type: "income",
        },
        {
          uuid: "jadjas",
          category: "health",
          description: "Visit to doctor",
          value: 50.25,
          type: "expensive",
        },
      ],
    },
    {
      date: "jun 02",
      records: [
        {
          uuid: "jadjaa",
          category: "Groseries",
          description: "buy candies",
          value: 25.5,
          type: "expensive",
        },
        {
          uuid: "jadjaa4",
          category: "Groseries",
          description: "buy candies",
          value: 25.5,
          type: "expensive",
        },
        {
          uuid: "jadjaa5",
          category: "Groseries",
          description: "buy candies",
          value: 25.5,
          type: "expensive",
        },
      ],
    },
  ],
};

export default transactions;
