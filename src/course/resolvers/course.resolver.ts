import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UpdateCourseInput } from '../dto';
import { AddCourseInput } from '../dto/add-course.dto';
import { Course } from '../entities';
import { CourseService } from '../services';

@Resolver(() => Course)
export class CourseResolver {
    constructor (private courseService: CourseService) {}

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
}
