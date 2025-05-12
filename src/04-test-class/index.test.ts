// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
} from '.';
import lodash from 'lodash';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    // Write your test here
    const account = getBankAccount(100);
    expect(account.getBalance()).toBe(100);

    const secondAccount = getBankAccount(0);
    expect(secondAccount.getBalance()).toBe(0);

    const thirdAccount = getBankAccount(-100);
    expect(thirdAccount.getBalance()).toBe(-100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    // Write your test here
    const account = getBankAccount(100);
    try {
      account.withdraw(101);
    } catch (error: unknown) {
      expect((error as Error).constructor).toBe(InsufficientFundsError);
    }
  });

  test('should throw error when transferring more than balance', () => {
    // Write your test here
    const senderAccount = getBankAccount(100);
    const receiverAccount = getBankAccount(100);

    expect(() => senderAccount.transfer(101, receiverAccount)).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    // Write your test here
    const senderAccount = getBankAccount(100);

    expect(() => senderAccount.transfer(100, senderAccount)).toThrow();
  });

  test('should deposit money', () => {
    // Write your test here
    const account = getBankAccount(100);

    account.deposit(10);
    expect(account.getBalance()).toBe(110);

    account.deposit(-120);
    expect(account.getBalance()).toBe(-10);
  });

  test('should withdraw money', () => {
    // Write your test here
    const account = getBankAccount(100);
    account.withdraw(10);

    expect(account.getBalance()).toBe(90);

    account.withdraw(90);
    expect(account.getBalance()).toBe(0);
  });

  test('should transfer money', () => {
    // Write your test here
    const senderAccount = getBankAccount(100);
    const receiverAccount = getBankAccount(100);

    senderAccount.transfer(10, receiverAccount);

    expect(senderAccount.getBalance()).toBe(90);
    expect(receiverAccount.getBalance()).toBe(110);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here
    const account = getBankAccount(100);
    jest.mock('lodash');
    lodash.random = jest
      .fn()
      .mockReturnValueOnce(50)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(75)
      .mockReturnValueOnce(1);
    const balanceResponseFirst = await account.fetchBalance();

    expect(balanceResponseFirst).toBe(null);

    const balanceResponseSecond = await account.fetchBalance();

    if (balanceResponseSecond !== null) {
      expect(typeof balanceResponseSecond === 'number').toBe(true);
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
    const account = getBankAccount(100);
    const expectedBalance = 55;

    const spyFetchBalance = jest
      .spyOn(account, 'fetchBalance')
      .mockResolvedValue(expectedBalance);

    try {
      await account.synchronizeBalance();

      expect(spyFetchBalance).toHaveBeenCalled();

      expect(account.getBalance()).toBe(expectedBalance);
    } catch {}
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
    const account = getBankAccount(100);

    try {
      await account.synchronizeBalance();
    } catch (error: unknown) {
      expect((error as SynchronizationFailedError).constructor).toBe(
        SynchronizationFailedError,
      );
    }
  });
});
