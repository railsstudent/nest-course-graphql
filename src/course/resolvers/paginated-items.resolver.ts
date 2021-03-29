import { Args, Query, Resolver } from '@nestjs/graphql'
import { CursorPaginationArgs } from '../dto'
import { PaginatedItems } from '../entities'
import { CourseService } from '../services'

@Resolver(() => PaginatedItems)
export class PaginatedItemsResolver {
  constructor(private courseService: CourseService) {}

  @Query(() => PaginatedItems, { nullable: true })
  async courses(@Args('args') args: CursorPaginationArgs): Promise<PaginatedItems> {
    return await this.courseService.getCourses(args)
  }
}
