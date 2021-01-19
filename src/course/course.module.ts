import { Module } from '@nestjs/common'
import { CourseResolver, LessonResolver, SentenceResolver, TranslationResolver } from './resolvers'
import { CourseService, LessonService, SentenceService, TranslationService } from './services'

@Module({
  providers: [
    CourseResolver,
    LessonResolver,
    CourseService,
    LessonService,
    SentenceService,
    TranslationService,
    SentenceResolver,
    TranslationResolver,
  ],
})
export class CourseModule {}
