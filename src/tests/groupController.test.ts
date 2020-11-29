import express from 'express';
import request from 'supertest';
import { groupRouter } from '../routes/groupRoutes';
import userService from '../services/groupServices';

jest.mock('../services/groupServices');

const app = express().use(express.json()).use(groupRouter);

const data = {
  id: '12345',
  login: 'loginName',
  password: 'Password 12345',
  age: 35,
  isDeleted: false,
};

describe('UserController', () => {
  test('GET /user', async () => {
    (userService.readAll as any).mockResolvedValue([data]);
    await request(app)
      .get('/user')
      .expect('Content-Type', /json/)
      .expect(200,[data])
  });

  test('GET /user/:id', async () => {
    (userService.readUserById as any).mockResolvedValue([data]);
    await request(app)
      .get('/user/12345')
      .expect('Content-Type', /json/)
      .expect(200,[data])
  });

  test('GET /user/:id user not found', async () => {
    (userService.readUserById as any).mockResolvedValue(null);
    await request(app)
      .get('/user/11111')
      .expect('Content-Type', /json/)
      .expect(404, '"User not found"')
  });

  test('POST /user',  async () => {
    const newUser = {
      login: 'newusername1',
      password: 'Password 12345',
      age: 55
    };
    (userService.create as any).mockResolvedValue(newUser);
     await request(app)
      .post('/user')
       .send(newUser)
       .set('Accept', 'application/json')
       .expect('Content-Type', /json/)
      .expect(201, newUser);
  });

  test('PUT /user/:id',  async () => {
    const updatedUser = {
      id: '12345',
      login: 'username2',
      password: 'PASSword 2',
      age: 55,
      isDeleted: false
    };
    (userService.update as any).mockResolvedValue(updatedUser);
    await request(app)
      .put('/user/12345')
      .send(updatedUser)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, updatedUser);
  });

  test('DELETE /user/:id', async()  => {
    (userService.delete as any).mockResolvedValue(data);
    await request(app)
      .delete('/user/123')
      .expect(200)
  });
});