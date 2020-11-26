import express from 'express';
import request from 'supertest';
import { userRouter } from '../routes/userRoutes';

const app = express().use(express.json()).use(userRouter);

describe('UserController', () => {
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

  it('GET /user/:id', done => {
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

  let data = {
    login: 'login name 1',
    password: 'password 12345',
    age: 35,
    isDeleted: false,
  };

  it('POST /user', done => {
    request(app)
      .post('/user')
      .set('Accept', 'application/json')
      /* .send(data)
      .expect('Content-Type', /json/)
      .expect(201)*/
      .end((err, res) => {
        if (err) {
          console.log('error --- ', err);
          done(err);
        } else {
          console.log(' res --- ', res);
          expect(res.body).toEqual({
            ...data,
          });
          done();
        }
      });

    /*   .then(response => {
        expect(response.body).toEqual({
          ...data,
        });
        done();
      });*/
  });
});
