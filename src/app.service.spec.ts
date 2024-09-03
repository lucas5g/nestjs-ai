import request from 'supertest';

describe('App (e2e)', () => {
  const url = 'http://localhost:3001';

  it('/download (POST)', async () => {
    const { body } = await request(url).post('/download').send({
      url: 'https://www.youtube.com/watch?v=WGkWUao3IRg',
    });

    expect(body).toBeTruthy();
  });

  it.only('/transcribe (POST)', async () => {
    const { body } = await request(url)
      .post('/transcribe')
      .attach('file', __dirname + '/test.mp4');

    expect(Object.keys(body)).toEqual(['text', 'x_groq']);
  }, 10000);
});
