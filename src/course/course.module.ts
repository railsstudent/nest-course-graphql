import { Module } from '@nestjs/common'
import { PrismaModule } from '../prisma'
import { CourseResolver, LessonResolver, SentenceResolver, TranslationResolver } from './resolvers'
import { CourseService, LessonService, SentenceService, TranslationService, UniqueHelper } from './services'

@Module({
  imports: [PrismaModule],
  providers: [
    CourseResolver,
    LessonResolver,
    CourseService,
    LessonService,
    SentenceService,
    TranslationService,
    SentenceResolver,
    TranslationResolver,
    UniqueHelper,
  ],
})
export class CourseModule {}
