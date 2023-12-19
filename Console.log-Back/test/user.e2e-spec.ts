import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { createNewUser, returnSiginJSON, signinTest } from './utils/test.utils';

describe('UserController', () => {
  let httpServer: any;
  let app: any;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Create User', () => {
    it('should return a 201 when create a new user', async () => {
      const response = await request(httpServer)
        .post('/users')
        .send(createNewUser);

      expect(response.status).toBe(201);
    });

    it('should return a 400 when password is not passed in body request', async () => {
      const response = await request(httpServer).post('/users').send({
        nm_user: 'TESTE',
        email: 'teste',
        type: 'T',
        registration: '21312313',
      });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        status: 400,
        error: 'O correu ao criar um usuario.',
      });
    });

    it('should return a 400 when email is not passed in body request', async () => {
      const response = await request(httpServer).post('/users').send({
        nm_user: 'TESTE',
        password: '1554546',
        type: 'T',
        registration: '21312313',
      });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        status: 400,
        error: 'User validation failed: email: Path `email` is required.',
      });
    });

    it('should return a 400 when type is not passed in body request', async () => {
      const response = await request(httpServer).post('/users').send({
        nm_user: 'TESTE',
        email: 'teste',
        password: '1554546',
        registration: '21312313',
      });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        status: 400,
        error: 'User validation failed: type: Path `type` is required.',
      });
    });
  });

  describe('Signin', () => {
    it('should return a 200 with corrects credentials', async () => {
      const response = await request(httpServer)
        .post(`/signin`)
        .send(signinTest);

      expect(response.status).toBe(201);
    });

    it('should return a 400 with wrong credentials', async () => {
      const response = await request(httpServer).post(`/signin`).send({
        email: 'test@errado',
        passoword: 'errada',
      });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe(returnSiginJSON.message);
    });

    it('should return a 500 should not pass email', async () => {
      const response = await request(httpServer).post(`/signin`).send({
        password: 'errada',
      });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe(
        'Please chacke your login credentials',
      );
    });

    it('should return a 500 should not pass ', async () => {
      const response = await request(httpServer).post(`/signin`).send({
        email: 'teste',
      });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Internal server error');
    });
  });
});
