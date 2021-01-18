import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Lesson } from './lesson.entity'

@ObjectType({ description: 'Language model' })
export class Language {
  @Field(() => ID)
  id: string

  @Field(() => String, { nullable: true })
  language?: string

  createdAt?: Date

  updatedAt?: Date
}
