import chain from 'chai';
import sinon from 'sinon';
import service from '../../src/modules/transactions/service';
import transactionEntity from '../../src/modules/transactions/entity';
import TransactionManagement from '../../src/libs/TransactionManagement';

import { sortedTransactions, orderedTransactions } from '../mocks/transactions.mock';

describe('Transaction module unit test', () => {
  let transactionService: any;
  let mock: any = null;
  before(() => {
    mock = {
      find: sinon.stub().returns({
        select: sinon.stub().returnsThis(),
        sort: sinon.stub().returns(sortedTransactions),
      }),
    };
    transactionService = new service(mock as typeof transactionEntity, new TransactionManagement());
  });

  after(() => {
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
});
