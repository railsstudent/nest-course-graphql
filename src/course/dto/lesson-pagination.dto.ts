import { PaginationArgs } from './pagination.dto'
import { ArgsType, Field } from '@nestjs/graphql'

@ArgsType()
export class GetLessonArgs extends PaginationArgs {
  @Field({ nullable: true })
  courseId: string
}
