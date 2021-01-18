import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AddCourseInput {
  @Field(() => String)
  name: string

  @Field(() => String)
  nativeName: string
}
