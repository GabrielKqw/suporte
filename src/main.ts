// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita CORS
  app.enableCors({
    origin: 'http://localhost:5173', // Substitua pela URL do seu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Permite o envio de cookies e credenciais (como tokens de autenticação)
    optionsSuccessStatus: 204, // Retorna 204 para as requisições de OPTIONS
  });

  await app.listen(3000);
}
bootstrap();
