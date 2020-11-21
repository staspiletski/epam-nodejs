import { mockRequest, mockResponse } from './mock';
import { describe, expect, test } from '@jest/globals';
import userController from '../controllers/userController';

/*
res.status = jest.fn(() => res);
res.json = jest.fn(() => res);
*/

describe('userController', () => {
  test('should 201 and return correct value', async () => {
    let req = mockRequest();
    const user = {
      id: 12345,
      login: 'login',
      password: 'password',
      age: 55,
      isDeleted: false,
    };

    const res = mockResponse();

    await userController.create(req, res);

    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(user);
  });

  /*  test('should 404 and return correct value', async () => {
    let req = mockRequest();
    req.params.id = null;
    const res = mockResponse();

    await controller.todoController(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Not Found' });
  });*/
});
