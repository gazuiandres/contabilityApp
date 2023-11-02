export interface BasedTransactionDto {
  userId: string;
  amount: string | number;
  category: string;
  description: string;
  type: string;
  date: Date;
}

export type TransactionFilterDto = {
  startDay?: string;
  endDay?: string;
  type?: string;
};

export interface TransactionsOptionDto {
  date?: Record<string, Date>;
  userId: string;
  type?: string;
}

export type CreateTransactionDto = Omit<BasedTransactionDto, 'userId'>;
export type UpdateTransactionDto = Partial<BasedTransactionDto>;


