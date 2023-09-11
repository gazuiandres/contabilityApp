import { connect } from 'mongoose';
import config from '../config';

async function dbConnect() {
  await connect(config.MONGO_DB_URI);
}

export default dbConnect
