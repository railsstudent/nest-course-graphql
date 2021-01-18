import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Lesson } from './lesson.entity'

@ObjectType()
export class Course {
  @Field(() => ID)
  id: string

  @Field(() => String, { nullable: true })
  name?: string

  @Field(() => String, { nullable: true })
  nativeName?: string

  createdAt?: Date

  updatedAt?: Date

  @Field(() => [Lesson], { nullable: true })
  lessons?: Lesson[]
}
