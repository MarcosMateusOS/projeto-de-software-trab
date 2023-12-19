export const createNewUser = {
  nm_user: 'TESTE',
  email: 'teste',
  password: '121321',
  type: 'T',
  registration: '21312313',
};

export const createNewQuiz = {
  title: 'QuickSort',
  subject: '62bba98a87687f39eaa52163',
  questions: [
    {
      title: 'Quick sort',
      alternatives: [
        {
          title: 'test',
          is_correct: 1,
        },
        {
          title: 'test',
          is_correct: 0,
        },
      ],
    },
  ],
};

export const concluedQuiz = {
  id_quiz: '62f17705d107ef2ea5e04f75',
  id_user: '62e2c9237ae65844fc761fd3',
  point: 5,
};

export const signinTest = {
  email: 'alunog2@gmail.com',
  password: '123456',
};

export const returnSiginJSON = {
  statusCode: 401,
  message: 'Please chacke your login credentials',
  error: 'Unauthorized',
};
