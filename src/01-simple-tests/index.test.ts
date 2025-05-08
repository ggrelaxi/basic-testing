// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    // Write your test here
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Add })).toEqual(3);
  });

  test('should subtract two numbers', () => {
    // Write your test here
    expect(simpleCalculator({ a: 2, b: 1, action: Action.Subtract })).toEqual(
      1,
    );
  });

  test('should multiply two numbers', () => {
    // Write your test here
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Multiply })).toEqual(
      6,
    );
  });

  test('should divide two numbers', () => {
    // Write your test here
    expect(simpleCalculator({ a: 6, b: 2, action: Action.Divide })).toEqual(3);
  });

  test('should exponentiate two numbers', () => {
    // Write your test here
    expect(
      simpleCalculator({ a: 3, b: 2, action: Action.Exponentiate }),
    ).toEqual(9);
  });

  test('should return null for invalid action', () => {
    // Write your test here
    expect(simpleCalculator({ a: 2, b: 3, action: 3 })).toEqual(null);
    expect(simpleCalculator({ a: 2, b: 3, action: '' })).toEqual(null);
    expect(simpleCalculator({ a: 2, b: 3, action: true })).toEqual(null);
  });

  test('should return null for invalid arguments', () => {
    // Write your test here
    expect(simpleCalculator({ a: '2', b: '3', action: Action.Add })).toEqual(
      null,
    );
    expect(
      simpleCalculator({ a: true, b: [], action: Action.Subtract }),
    ).toEqual(null);
    expect(
      simpleCalculator({ a: {}, b: null, action: Action.Multiply }),
    ).toEqual(null);
    expect(
      simpleCalculator({ a: undefined, b: Symbol('1'), action: Action.Divide }),
    ).toEqual(null);
  });
});
