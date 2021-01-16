import { Module } from '@nestjs/common';
import { CourseResolver, LessonResolver } from './resolvers';
import { CourseService, LessonService } from './services';

@Module({
  providers: [CourseResolver, LessonResolver, CourseService, LessonService]
})
export class CourseModule {}
