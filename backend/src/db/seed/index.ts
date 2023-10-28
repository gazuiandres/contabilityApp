import mongoose from 'mongoose';

import seedCategories from './categories.seed';
import seedAdminUser from './userAdmin.seed';
import dbConnect from '../../libs/mongoose';

async function seedData() {
  await seedCategories();
  await seedAdminUser();
}

dbConnect()
  .then(async () => {
    console.log('SEEDING DB');
    await seedData();
    await mongoose.disconnect();
  })
  .catch(() => {
    console.log('ERROR CONNECTING MONGO DB');
    mongoose.disconnect();
  });
