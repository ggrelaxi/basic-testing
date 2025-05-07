// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    // Write your test here
    const value = await resolveValue('value');
    expect(value).toBe('value');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    // Write your test here
    expect(() => throwError('ErrorMessage')).toThrow('ErrorMessage');
  });

  test('should throw error with default message if message is not provided', () => {
    // Write your test here
    expect(() => throwError()).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    // Write your test here
    try {
      throwCustomError();
    } catch (error: unknown) {
      expect((error as Error).constructor).toBe(MyAwesomeError);
    }
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    // Write your test here
    try {
      await rejectCustomError();
    } catch (error: unknown) {
      expect((error as Error).constructor).toBe(MyAwesomeError);
    }
  });
});
