// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    // Write your test here
    expect(generateLinkedList([])).toStrictEqual({ value: null, next: null });
    expect(generateLinkedList([1])).toStrictEqual({
      value: 1,
      next: { value: null, next: null },
    });
    expect(generateLinkedList([1, 2])).toStrictEqual({
      value: 1,
      next: { value: 2, next: { value: null, next: null } },
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    // Write your test here
    expect(generateLinkedList([])).toMatchSnapshot();
    expect(generateLinkedList([1])).toMatchSnapshot();
    expect(generateLinkedList([1, 2])).toMatchSnapshot();
  });
});
