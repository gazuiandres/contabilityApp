import UserModel from '../../modules/users/entity';
import bcrypt from 'bcrypt';

async function seedAdminUser() {
  const adminUser = {
    email: 'admin@admin.com',
    password: await bcrypt.hash('adminPassword', 10),
    roles: ['admin'],
  };

  await UserModel.create(adminUser);
}

export default seedAdminUser;
