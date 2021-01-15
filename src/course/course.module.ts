import { Module } from '@nestjs/common';
import { CourseResolver } from './resolvers';
import { CourseService, LessonService } from './services';

@Module({
  providers: [CourseResolver, CourseService, LessonService]
})
export class CourseModule {}
