import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class AddCourseInput {

    @Field(() => String, { nullable: true })
    name?: string;

    @Field(() => String, { nullable: true })
    nativeName?: string;
}