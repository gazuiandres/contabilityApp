import chain from 'chai';
import sinon from 'sinon';
import service from '../../src/modules/transactions/service';
import transactionEntity from '../../src/modules/transactions/entity';
import TransactionManagement from '../../src/libs/TransactionManagement';

import { sortedTransactions, orderedTransactions, getTransaction } from '../mocks/transactions.mock';

describe('Transaction module unit test', () => {
  let transactionService: any;
  let mock: any = null;

  beforeEach(() => {
    mock = {
      find: sinon.stub().returns({
        select: sinon.stub().returnsThis(),
        sort: sinon.stub().returns(sortedTransactions),
      }),
      findOne: sinon.stub().returns(getTransaction),
      create: sinon.stub().returns(getTransaction),
      findOneAndDelete: sinon.stub().returns(getTransaction),
    };

    transactionService = new service(mock as typeof transactionEntity, new TransactionManagement());
  });

  afterEach(() => {
    sinon.restore();
    transactionService = null;
  });

  it('get all user transactions', async () => {
    const dates = {
      startDay: '06/15/2023',
      endDay: '09/17/2023',
    };
    const response = await transactionService.getTransactions(dates);
    chain.expect(response).to.deep.equal(orderedTransactions);
  });

  it('get transaction', async () => {
    const data = {
      id: '64b202e047c659520f597r2d',
      userId: '64b202e047c659520f597c2d',
    };
    const response = await transactionService.getTransaction(data);
    chain.expect(response).to.deep.equal(getTransaction);
  });

  it('create transaction ', async () => {
    const data = {
      amount: 10,
      category: 'Health',
      description: 'Macdonals',
      type: 'expenses',
      date: new Date('2023-10-13T04:00:00.000Z'),
    };
    const response = await transactionService.createTransaction(data, '64b202e047c659520f597c2d');
    chain.expect(response).to.deep.equal(getTransaction);
  });

  it('delete transaction ', async () => {
    await transactionService.deleteTransaction('64b202e047c659520f597r2d', '64b202e047c659520f597c2d');
    sinon.assert.calledOnce(mock.findOneAndDelete);
  });
});
