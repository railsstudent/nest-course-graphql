import { Query, Resolver } from '@nestjs/graphql';
import { Course } from '../entities';
import { CourseService } from '../services';

@Resolver(() => Course)
export class CourseResolver {
    constructor (private courseService: CourseService) {}

    @Query(() => [Course!])
    courses() {
        return this.courseService.getCourses();
    }
}
