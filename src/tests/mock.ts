import { jest } from '@jest/globals';

export const mockRequest = () => {
  const req = {
    body: jest.fn().mockReturnValue(111),
    params: jest.fn().mockReturnValue(222),
  };
  return req;
};

export const mockResponse = () => {
  const res = {
    send: jest.fn().mockReturnValue(1),
    status: jest.fn().mockReturnValue(2),
    json: jest.fn().mockReturnValue(3),
  };

  return res;
};

export const mockNext = () => jest.fn();
