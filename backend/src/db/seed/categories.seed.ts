import CategoryModel from '../../modules/categories/entity';

async function seedCategories() {
  const expensiveCategories = [
    {
      name: 'Bills',
      description: 'Bill category',
      type: 'expensive',
    },
    {
      name: 'Home',
      description: 'Home category',
      type: 'expensive',
    },
    {
      name: 'Car',
      description: 'Car category',
      type: 'expensive',
    },
    {
      name: 'Clothing',
      description: 'Clothing category',
      type: 'expensive',
    },
    {
      name: 'Education',
      description: 'Education category',
      type: 'expensive',
    },
    {
      name: 'Electronics',
      description: 'Electronics category',
      type: 'expensive',
    },
    {
      name: 'Entertainment',
      description: 'Entertainment category',
      type: 'expensive',
    },
    {
      name: 'Food',
      description: 'Food category',
      type: 'expensive',
    },
    {
      name: 'Health',
      description: 'Health category',
      type: 'expensive',
    },
    {
      name: 'Insurance',
      description: 'Insurance category',
      type: 'expensive',
    },
    {
      name: 'Shopping',
      description: 'Shopping category',
      type: 'expensive',
    },
    {
      name: 'Social',
      description: 'Social category',
      type: 'expensive',
    },
    {
      name: 'Sport',
      description: 'Sport category',
      type: 'expensive',
    },
    {
      name: 'Tax',
      description: 'Tax category',
      type: 'expensive',
    },
    {
      name: 'Transportation',
      description: 'Transportation category',
      type: 'expensive',
    },
    {
      name: 'Telephone',
      description: 'Telephone category',
      type: 'expensive',
    },
  ];

  const incomeCategories = [
    {
      name: "Awards",
      description: "Awards category",
      type: "income",
    },
    {
      name: "Coupon",
      description: "Coupon category",
      type: "income",
    },
    {
      name: "Grants",
      description: "Grants category",
      type: "income",
    },
    {
      name: "Lottery",
      description: "Lottery category",
      type: "income",
    },
    {
      name: "Refunds",
      description: "Refunds category",
      type: "income",
    },
    {
      name: "Rental",
      description: "Rental category",
      type: "income",
    },
    {
      name: "Salary",
      description: "Salary category",
      type: "income",
    },
    {
      name: "Sale",
      description: "Sale category",
      type: "income",
    },
  ]

  const categories = [...expensiveCategories, ...incomeCategories]
  await CategoryModel.insertMany(categories);
}

export default seedCategories;
