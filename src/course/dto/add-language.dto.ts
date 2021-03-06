import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AddLanguageInput {
  @Field(() => String)
  name: string

  @Field(() => String)
  nativeName: string

  @Field(() => String, { nullable: true })
  flag?: string

  @Field(() => String, { nullable: true })
  shinyFlag?: string
}
