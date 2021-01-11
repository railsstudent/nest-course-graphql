import { Module } from '@nestjs/common';
import { CourseResolver } from './resolvers';
import { CourseService } from './services';

@Module({
  providers: [CourseResolver, CourseService]
})
export class CourseModule {}
