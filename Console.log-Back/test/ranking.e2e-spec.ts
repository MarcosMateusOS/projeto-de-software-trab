import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { concluedQuiz, createNewQuiz, createNewUser } from './utils/test.utils';

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

  describe('Concluded a Quiz', () => {
    it('should return a 201 when Concluded a quiz', async () => {
      const response = await request(httpServer)
        .post('/ranking')
        .send(concluedQuiz);

      expect(response.status).toBe(201);
    });

    it('should return a 400 when id_quiz is not passed', async () => {
      const response = await request(httpServer).post('/ranking').send({
        id_quiz: '62f17705d107ef2ea5e04f75',
        point: 5,
      });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: 'O correu um erro ao enviar sua resposta.Tente mais tarde.',
        status: 400,
      });
    });
  });

  describe('Get Ranking', () => {
    it('should return a 201 when Concluded a quiz', async () => {
      const mockId = '62e2cab57ae65844fc762019';
      const response = await request(httpServer).get(`/ranking/${mockId}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });
});
