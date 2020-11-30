import express from 'express';
import request from 'supertest';
import { groupRouter } from '../routes/groupRoutes';
import groupService from '../services/groupServices';

jest.mock('../services/groupServices');

const app = express().use(express.json()).use(groupRouter);

const data = {
  name: 'ADMIN',
  permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'],
};

describe('GroupController', () => {
  test('GET /group', async () => {
    (groupService.readAll as any).mockResolvedValue([data]);
    await request(app).get('/group').expect('Content-Type', /json/).expect(200, [data]);
  });

  test('GET /group/:id', async () => {
    (groupService.readGroupById as any).mockResolvedValue([data]);
    await request(app).get('/group/12345').expect('Content-Type', /json/).expect(200, [data]);
  });

  test('GET /group/:id group not found', async () => {
    (groupService.readGroupById as any).mockResolvedValue(null);
    await request(app)
      .get('/group/11111')
      .expect('Content-Type', /json/)
      .expect(404, '"Group not found"');
  });

  test('POST /group', async () => {
    const newGroup = {
      name: 'TESTER',
      permissions: ['READ', 'UPLOAD_FILES'],
    };

    (groupService.create as any).mockResolvedValue(newGroup);
    await request(app)
      .post('/group')
      .send(newGroup)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201, newGroup);
  });

  test('PUT /group/:id', async () => {
    const updatedGroup = {
      name: 'POWERTESTER',
      permissions: ['READ', 'UPLOAD_FILES', 'WRITE'],
    };

    (groupService.update as any).mockResolvedValue(updatedGroup);
    await request(app)
      .put('/group/12345')
      .send(updatedGroup)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, updatedGroup);
  });

  test('DELETE /group/:id', async () => {
    (groupService.delete as any).mockResolvedValue(data);
    await request(app).delete('/group/123').expect(200);
  });
});
