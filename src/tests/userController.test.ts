import express from 'express';
import request from 'supertest';
import { userRouter } from '../routes/userRoutes';
import userService from '../services/userServices';
import Mock = jest.Mock;

jest.mock('../services/userServices');
/*, () => ({
  userService: {
    readAll: jest.fn(),
    updateUser: jest.fn(),
    getUserById: jest.fn(),
    getAutoSuggestUsers: jest.fn(),
    markUserDeleted: jest.fn()
  }
}));
*/
const app = express().use(express.json()).use(userRouter);

const data = {
  login: 'login name 1',
  password: 'password 12345',
  age: 35,
  isDeleted: false,
};

describe('UserController', () => {
  (userService.readAll as Mock).mockResolvedValue([
    { id: '123', login: 'login1', password: 'TestPassword123', age: 54 }
  ]);

  it('GET /user', done => {
    request(app)
      .get('/user')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              login: 'user name 1',
            }),
          ]),
        );
        done();
      });
  });

  it('GET /user/:id', done => {
    request(app)
      .get('/user/9cc90bfb-3552-47b9-86a9-4a2be7954f60')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).toEqual({
          age: 15,
          id: '9cc90bfb-3552-47b9-86a9-4a2be7954f60',
          isDeleted: false,
          login: 'user name 1',
          password: 'passWORD 1',
        });
        done();
      });
  });

  it('GET /user/:id user not found', done => {
    request(app)
      .get('/user/9cc90bfb-5555-47b9-86a9-4a2be7954f60')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, '"User not found"')
      .end(err => {
        if (err) done(err);
        done();
      });
  });

  it('POST /user', done => {
    // @ts-ignore
    userService.create.mockResolvedValue(data);
    request(app)
      .post('/user')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err) => {
        if (err) return done(err);
          done();
      });

    /*   .then(response => {
        expect(response.body).toEqual({
          ...data,
        });
        done();
      });*/
  });
});
