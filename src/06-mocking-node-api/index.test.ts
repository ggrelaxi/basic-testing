// Uncomment the code below and write your tests
import path from 'node:path';
import fs from 'node:fs';
import fsPromises from 'node:fs/promises';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

beforeAll(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

describe('doStuffByTimeout', () => {
  test('should set timeout with provided callback and timeout', () => {
    // Write your test here
    const spySetTimeout = jest.spyOn(global, 'setTimeout');
    const mockCallback = jest.fn();
    const mockDelay = 1000;

    doStuffByTimeout(mockCallback, mockDelay);

    expect(spySetTimeout).toHaveBeenCalledTimes(1);
    expect(spySetTimeout).toHaveBeenCalledWith(mockCallback, mockDelay);
  });

  test('should call callback only after timeout', () => {
    // Write your test here
    const mockCallback = jest.fn();
    const mockDelay = 2000;

    doStuffByTimeout(mockCallback, mockDelay);

    expect(mockCallback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(mockDelay - 1);

    expect(mockCallback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  test('should set interval with provided callback and timeout', () => {
    // Write your test here
    const spySetInterval = jest.spyOn(global, 'setInterval');
    const mockCallback = jest.fn();
    const mockInterval = 1000;

    doStuffByInterval(mockCallback, mockInterval);

    expect(spySetInterval).toHaveBeenCalledTimes(1);
    expect(spySetInterval).toHaveBeenCalledWith(mockCallback, mockInterval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    // Write your test here
    const mockCallback = jest.fn();
    const mockInterval = 2000;

    doStuffByInterval(mockCallback, mockInterval);

    expect(mockCallback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(mockInterval);

    expect(mockCallback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(mockInterval - 1);
    expect(mockCallback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(mockInterval);

    expect(mockCallback).toHaveBeenCalledTimes(2);

    jest.advanceTimersByTime(mockInterval);

    expect(mockCallback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    // Write your test here
    const mockPath = 'somepath';

    jest.spyOn(path, 'join').mockImplementation(() => mockPath);

    await readFileAsynchronously(mockPath);
    expect(path.join).toHaveBeenCalledTimes(1);
    expect(path.join).toHaveBeenCalledWith(
      __dirname,
      expect.stringContaining(mockPath),
    );
  });

  test('should return null if file does not exist', async () => {
    // Write your test here
    const mockPath = 'somepath';

    jest.spyOn(path, 'join').mockImplementation(() => mockPath);

    jest.spyOn(fs, 'existsSync').mockImplementation(() => false);

    const response = await readFileAsynchronously(mockPath);
    expect(response).toBe(null);
  });

  test('should return file content if file exists', async () => {
    // Write your test here
    const mockPath = 'somepath';
    jest.spyOn(path, 'join').mockImplementation(() => mockPath);

    const mockContent = 'File content';

    jest.spyOn(fs, 'existsSync').mockImplementation(() => true);

    jest
      .spyOn(fsPromises, 'readFile')
      .mockImplementation(() => Promise.resolve(mockContent));

    const response = await readFileAsynchronously(mockPath);
    expect(response).toBe(mockContent);
  });
});
