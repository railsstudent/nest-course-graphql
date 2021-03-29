import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { UpdateCourseInput, AddCourseInput, PaginationArgs } from '../dto'
import { Course, Lesson } from '../entities'
import { CourseService, LessonService } from '../services'

@Resolver(() => Course)
export class CourseResolver {
  constructor(private courseService: CourseService, private lessonService: LessonService) {}

  // @Query(() => ({ cursor: number, courses: Course[] }), { nullable: true })
  // async courses(@Args('args') args: CursorPaginationArgs): Promise<{ cursor: number, courses: Course[] }> {
  //   return await this.courseService.getCourses(args)
  // }

  @Query(() => Course, { nullable: true })
  async course(@Args('id', { defaultValue: '', type: () => String }) id?: string): Promise<Course | undefined> {
    return await this.courseService.getCourse(id)
  }

  @Mutation(() => Course)
  async addCourse(@Args('newCourse') input: AddCourseInput): Promise<Course> {
    return await this.courseService.addCourse(input)
  }

  @Mutation(() => Course)
  async updateCourse(@Args('course') input: UpdateCourseInput): Promise<Course> {
    return await this.courseService.updateCourse(input)
  }

  @ResolveField()
  async lessons(@Parent() course: Course, @Args('args') args: PaginationArgs): Promise<Lesson[]> {
    const { id: courseId } = course
    return await this.lessonService.getPaginatedLessons({ ...args, courseId })
  }
}
