import { Request, Response, NextFunction } from 'express';
import TransactionService from './service';
import { TransactionFilterDto } from './dtos/transaction.dto';
import { UserToken } from '../../global';
import { TransactionControllerInterface } from './type';

class TransactionController implements TransactionControllerInterface {
  constructor(private service: TransactionService) {}

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as UserToken;
      const { startDay, endDay } = req.query as TransactionFilterDto;
      const transactions = await this.service.getTransactions({ startDay, endDay }, user.sub);
      res.json(transactions);
    } catch (error) {
      next(error);
    }
  }

  async getTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = req.user as UserToken;
      const transaction = await this.service.getTransaction(id, user.sub);
      res.json(transaction);
    } catch (error) {
      next(error);
    }
  }

  async getAnalytics(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as UserToken;
      const { startDay, endDay, type } = req.query as TransactionFilterDto;
      const analytics = await this.service.getAnalytics({ startDay, endDay, type }, user.sub);
      res.json(analytics);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as UserToken;
      const { amount, category, type, date, description } = req.body;
      const data = { amount, category, type, date, description };
      const transaction = await this.service.createTransaction(data, user.sub);
      res.status(201).json(transaction);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = req.user as UserToken;
      await this.service.updateTransaction(id, req.body, user.sub);
      res.json({
        message: 'Transaction updated succesfully',
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = req.user as UserToken;
      await this.service.deleteTransaction(id, user.sub);
      res.json({
        message: 'Transaction deleted succesfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

export default TransactionController;
