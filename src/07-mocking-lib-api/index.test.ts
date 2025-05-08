// Uncomment the code below and write your tests
import axios from 'axios';
import { THROTTLE_TIME, throttledGetDataFromApi } from './index';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
  jest.clearAllTimers();
});

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    // Write your test here
    jest.mock('axios');
    jest.mock('lodash');
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.get = jest.fn().mockResolvedValue({ data: 'response' });
    axios.create = jest.fn(() => mockedAxios as jest.Mocked<typeof axios>);

    const baseUrl = 'https://jsonplaceholder.typicode.com';
    const relativePath = 'testEndpoint';
    await throttledGetDataFromApi(relativePath);

    expect(mockedAxios.create.mock.calls.length).toBe(1);
    expect(mockedAxios.create.mock.calls[0]?.[0]).toStrictEqual({
      baseURL: baseUrl,
    });
  });

  test('should perform request to correct provided url', async () => {
    // Write your test here
    jest.useFakeTimers();
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    axios.create = jest.fn(() => mockedAxios as jest.Mocked<typeof axios>);

    const relativePath = 'testEndpoint';
    jest.advanceTimersByTime(THROTTLE_TIME);

    await throttledGetDataFromApi(relativePath);

    expect(mockedAxios.create.mock.calls.length).toBe(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    // Write your test here
    jest.mock('axios');
    jest.mock('lodash');
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.get = jest.fn().mockResolvedValue({ data: 'response' });
    axios.create = jest.fn(() => mockedAxios as jest.Mocked<typeof axios>);
    const relativePath = 'testEndpoint';

    await throttledGetDataFromApi(relativePath);
    jest.advanceTimersByTime(THROTTLE_TIME);

    expect(mockedAxios.create.mock.calls.length).toBe(1);
    expect(mockedAxios.get.mock.calls.length).toBe(1);
    expect(await mockedAxios.get.mock.results[0]?.value).toStrictEqual({
      data: 'response',
    });

    jest.advanceTimersByTime(THROTTLE_TIME + 1);
    expect(mockedAxios.get.mock.calls.length).toBe(1);

    jest.advanceTimersByTime(THROTTLE_TIME + THROTTLE_TIME);
    expect(mockedAxios.get.mock.calls.length).toBe(1);
  });
});
