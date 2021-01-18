import { Module } from '@nestjs/common'
import { CourseResolver, LessonResolver } from './resolvers'
import { CourseService, LessonService, SentenceService } from './services'

@Module({
  providers: [CourseResolver, LessonResolver, CourseService, LessonService, SentenceService],
})
export class CourseModule {}
