import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import * as bodyParser from 'body-parser';
import morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(compression());
  app.use(helmet());
  app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", 'cdn.jsdelivr.net'],
      styleSrc: ["'self'", "'unsafe-inline'", 'fonts.googleapis.com/css', 'cdn.jsdelivr.net'],
      fontSrc: ["'self'", 'fonts.gstatic.com'],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'" , 'cdn.jsdelivr.net']
    }
  }));
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(morgan('dev'));

  app.use(
    rateLimit({
      windowMs: 1 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 500 requests per windowMs
    }),
  );
  await app.listen(3000);
}
bootstrap();
