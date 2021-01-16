import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UpdateCourseInput, AddCourseInput, PaginationArgs } from '../dto';
import { Course } from '../entities';
import { CourseService, LessonService } from '../services';

@Resolver(() => Course)
export class CourseResolver {
    constructor (private courseService: CourseService, private lessonService: LessonService) {}

    @Query(() => [Course], { nullable: true })
    courses(): Promise<Course[]> {
        return this.courseService.getCourses();
    }

    @Query(() => Course, { nullable: true })
    course(@Args('id', { defaultValue: '', type: () => String }) id?: string): Promise<Course | undefined> {
        return this.courseService.getCourse(id);
    }

    @Mutation(() => Course) 
    addCourse(@Args('newCourse') input: AddCourseInput): Promise<Course> {
        return this.courseService.addCourse(input)
    }

    @Mutation(() => Course) 
    updateCourse(@Args('course') input: UpdateCourseInput): Promise<Course> {
        return this.courseService.updateCourse(input)
    }

    @ResolveField()
    lessons(@Parent() course: Course, @Args('args') args: PaginationArgs) {
        const { id: courseId } = course
        return this.lessonService.getPaginatedLessons({ ...args, courseId })
    }
}
