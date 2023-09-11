import mongoose from 'mongoose';
import { BasedTransactionDto } from './dtos/transaction.dto';
const { Schema, model } = mongoose;

const transactionSchema = new Schema<BasedTransactionDto>({
  userId: {
    require: true,
    type: String,
  },
  amount: {
    require: true,
    type: Number,
  },
  category: {
    require: true,
    type: String,
  },
  description: {
    require: true,
    type: String
  },
  type: {
    require: true,
    type: String,
  },
  date: {
    require: true,
    type: Date,
  },
});

const TransactionModel = model('transactions', transactionSchema);

export default TransactionModel;
