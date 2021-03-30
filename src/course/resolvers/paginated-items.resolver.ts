import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CursorPaginationArgs } from '../dto'
import { PaginatedItems } from '../entities'
import { CourseService, LessonService } from '../services'

@Resolver(() => PaginatedItems)
export class PaginatedItemsResolver {
  constructor(private courseService: CourseService, private lessonService: LessonService) {}

  @Query(() => PaginatedItems, { nullable: true })
  async courses(@Args('args') args: CursorPaginationArgs): Promise<PaginatedItems> {
    return await this.courseService.getCourses(args)
  }

  @Mutation(() => PaginatedItems)
  async nextLessons(
    @Args('courseId') courseId: string,
    @Args('args') args: CursorPaginationArgs,
  ): Promise<PaginatedItems> {
    return await this.lessonService.getPaginatedLessons({ ...args, courseId })
  }
}
