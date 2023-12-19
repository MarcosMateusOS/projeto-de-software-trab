import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { createNewQuiz, createNewUser } from './utils/test.utils';

describe('QuizController', () => {
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

  describe('Create Quiz', () => {
    it('should return a 201 when create a new quiz', async () => {
      const response = await request(httpServer)
        .post('/quiz')
        .send(createNewQuiz);

      expect(response.status).toBe(201);
    });
  });

  describe('List one Quiz of Subject', () => {
    it('should return a quiz of Subject', async () => {
      const mockId = '62bba98a87687f39eaa52163';
      const response = await request(httpServer).get(`/quiz/${mockId}`);

      expect(response.status).toBe(200);
    });
  });
});
