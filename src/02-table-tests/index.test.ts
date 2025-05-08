// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  // continue cases for other actions
  { a: 2, b: 1, action: Action.Subtract, expected: 1 },
  { a: 2, b: 3, action: Action.Multiply, expected: 6 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 2, b: 3, action: 3, expected: null },
  { a: 2, b: 3, action: '', expected: null },
  { a: 2, b: 3, aciton: true, expected: null },
  { a: '2', b: undefined, action: Action.Add, expected: null },
  { a: true, b: [], action: Action.Subtract, expected: null },
  { a: {}, b: null, action: Action.Multiply, expected: null },
  { a: undefined, b: Symbol('1'), action: Action.Divide, expected: null },
];

describe('simpleCalculator', () => {
  // This test case is just to run this test suite, remove it when you write your own tests
  // Consider to use Jest table tests API to test all cases above
  test.each(testCases)('test with data - %s', ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
});
