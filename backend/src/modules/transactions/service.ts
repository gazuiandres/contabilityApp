import { Model } from 'mongoose';
import boom from '@hapi/boom';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { TransactionServiceInterface } from './type';

dayjs.extend(utc);

import {
  BasedTransactionDto,
  UpdateTransactionDto,
  CreateTransactionDto,
  TransactionFilterDto,
  TransactionsOptionDto,
} from './dtos/transaction.dto';
import TransactionManagement from '../../libs/TransactionManagement';
import { BasedAnalytics } from './dtos/analytic.dto';
import { IEncryptManager } from 'src/global';

class TransactionService implements TransactionServiceInterface {
  constructor(
    private model: Model<BasedTransactionDto>,
    private transactionManagement: TransactionManagement,
    private encryptService: IEncryptManager,
  ) {}
  async getTransactions({ startDay, endDay }: TransactionFilterDto, userId: string) {
    let options: TransactionsOptionDto = {
      userId,
    };

    if (startDay && endDay) {
      options = {
        ...options,
        date: {
          $gte: new Date(startDay),
          $lte: new Date(endDay),
        },
      };
    }

    const transactions = await this.model
      .find(options)
      .select({ amount: 1, category: 1, description: 1, type: 1, date: 1 })
      .sort({ date: 'desc' });

    const transactionsDecripted = transactions.map((transaction) => {
      return {
        ...transaction.toJSON(),
        amount: this.encryptService.decrypt(transaction.amount as string, 'number'),
      };
    });

    return this.transactionManagement.orderByDay(transactionsDecripted);
  }

  async getTransaction(id: string, userId: string) {
    const transaction = await this.model.findOne({ _id: id, userId });
    if (!transaction) {
      throw boom.notFound('Transaction not found');
    }

    transaction.amount = this.encryptService.decrypt(transaction.amount as string, 'number');

    return transaction;
  }

  async getAnalytics({ startDay, endDay, type }: TransactionFilterDto, userId: string) {
    let options: TransactionsOptionDto = {
      userId,
      type,
    };

    if (startDay && endDay) {
      options = {
        ...options,
        date: {
          $gte: new Date(startDay),
          $lte: new Date(endDay),
        },
      };
    }

    const analytics: BasedAnalytics[] = await this.model.aggregate([
      { $match: options },
      { $sort: { date: -1 } },
      { $group: { _id: '$category', total: { $sum: '$amount' } } },
      { $project: { _id: 0, category: '$_id', total: '$total' } },
    ]);

    const data: number[] = analytics.map((data) => data.total);
    const categoryLabels: string[] = analytics.map((data) => data.category);

    return {
      data,
      categoryLabels,
    };
  }

  async createTransaction(data: CreateTransactionDto, userId: string) {
    const dateUtc = dayjs(data.date).utc().format();
    const newTrasactionData = {
      userId,
      ...data,
      amount: this.encryptService.encrypt(data.amount),
      date: dateUtc,
    };
    const newTransaction = await this.model.create(newTrasactionData);
    return newTransaction;
  }

  async updateTransaction(id: string, data: UpdateTransactionDto, userId: string) {
    const encryptedData = {
      ...data,
      amount: this.encryptService.encrypt(Number(data.amount)),
    };
    const transaction = await this.model.findOneAndUpdate({ _id: id, userId }, encryptedData);

    if (!transaction) {
      throw boom.badRequest();
    }
  }

  async deleteTransaction(id: string, userId: string) {
    const transaction = await this.model.findOneAndDelete({ _id: id, userId });
    if (!transaction) {
      throw boom.badRequest();
    }
  }
}

export default TransactionService;
