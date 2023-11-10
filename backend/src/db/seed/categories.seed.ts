import CategoryModel from '../../modules/categories/entity';

async function seedCategories() {
  const expensiveCategories = [
    {
      name: 'Bills',
      description: 'Bill category',
      type: 'expense',
    },
    {
      name: 'Home',
      description: 'Home category',
      type: 'expense',
    },
    {
      name: 'Car',
      description: 'Car category',
      type: 'expense',
    },
    {
      name: 'Clothing',
      description: 'Clothing category',
      type: 'expense',
    },
    {
      name: 'Education',
      description: 'Education category',
      type: 'expense',
    },
    {
      name: 'Electronics',
      description: 'Electronics category',
      type: 'expense',
    },
    {
      name: 'Entertainment',
      description: 'Entertainment category',
      type: 'expense',
    },
    {
      name: 'Food',
      description: 'Food category',
      type: 'expense',
    },
    {
      name: 'Health',
      description: 'Health category',
      type: 'expense',
    },
    {
      name: 'Insurance',
      description: 'Insurance category',
      type: 'expense',
    },
    {
      name: 'Shopping',
      description: 'Shopping category',
      type: 'expense',
    },
    {
      name: 'Social',
      description: 'Social category',
      type: 'expense',
    },
    {
      name: 'Sport',
      description: 'Sport category',
      type: 'expense',
    },
    {
      name: 'Tax',
      description: 'Tax category',
      type: 'expense',
    },
    {
      name: 'Transportation',
      description: 'Transportation category',
      type: 'expense',
    },
    {
      name: 'Telephone',
      description: 'Telephone category',
      type: 'expense',
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
