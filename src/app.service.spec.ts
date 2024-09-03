import { AppService } from '@/app.service';
import { Test, TestingModule } from '@nestjs/testing';
// import request from 'supertest';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('transcribe', async () => {
    const res = await service.transcribe();
    expect(res.text.trim()).toEqual(
      'Como é a história de volta? Muito feliz, emoção da primeira convocação em 2011. Muito feliz, um sonho realizado, uma meta alcançada. Animado, ansioso para este momento que eu tanto esperei, tanto batalhei. Agora é aproveitar a oportunidade. A gente sabia que existia uma pré-lista, acabou que o Sabinho se lesionou. Onde você estava quando você recebeu a notícia? Como é que foi? Você é um cara muito experiente, já viveu isso muitas vezes. Mas como é que foi o frio na barriga dessa vez? Bom, primeiramente desejar melhoras aí, uma boa recuperação pro Savinho, né? Eu esperava, eu batalhei por essa oportunidade. Olha que a gente fica triste com a lesão do companheiro, mas faz parte do futebol. Eu tava embarcando pro Rio de Janeiro, né? Pro jogo do Fluminense. Estava ali no avião, não imaginava. O comandante pegou o interfone ali e avisou. E foi uma surpresa, achei que até pegadinha, porque olhei no celular, não tinha mensagem nenhuma. E aí depois saiu a notícia e...',
    );
  }, 6000);

  it('download yt', async () => {
    const url = 'https://www.youtube.com/watch?v=Dn8vzTsnPps';
    const res = await service.download(url);
    expect(res).toBeDefined();
  });
});
describe('App (e2e)', () => {
  const url = 'http://localhost:3001';

  it.only('/download (POST)', async () => {
    const res = await request(url)
      .post('download')
      .send({
        url: 'https://www.youtube.com/watch?v=jHS1RJREG2Q'
      });
  });
})
