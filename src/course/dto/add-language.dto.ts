import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AddLanguageInput {
  @Field(() => String)
  language: string
}
