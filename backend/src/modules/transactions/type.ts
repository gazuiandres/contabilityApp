import { Request, Response, NextFunction } from 'express';

import {
    BasedTransactionDto,
    UpdateTransactionDto,
    CreateTransactionDto,
    TransactionFilterDto
  } from './dtos/transaction.dto';
import { ProcessedAnalytics } from './dtos/analytic.dto';

export interface TransactionControllerInterface {
  getAll(req: Request, res: Response, next: NextFunction): Promise<void>;
  getTransaction(req: Request, res: Response, next: NextFunction): Promise<void>;
  getAnalytics(req: Request, res: Response, next: NextFunction): Promise<void>;
  create(req: Request, res: Response, next: NextFunction): Promise<void>;
  update(req: Request, res: Response, next: NextFunction): Promise<void>;
  delete(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export interface TransactionServiceInterface {
    getTransactions(dates: TransactionFilterDto, userId: string): Promise<BasedTransactionDto[]>;
    getTransaction(id: string, userId: string): Promise<BasedTransactionDto>;
    getAnalytics(filterOptions: TransactionFilterDto, userId: string): Promise<ProcessedAnalytics>,
    createTransaction(data: CreateTransactionDto, id: string): Promise<BasedTransactionDto>;
    updateTransaction(id: string, data: UpdateTransactionDto, userId: string): Promise<void>;
    deleteTransaction(id: string, userId: string): Promise<void>;
}
