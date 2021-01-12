import { Field, ID, InputType } from "@nestjs/graphql";
import { AddCourseInput } from "./add-course.dto";

@InputType()
export class UpdateCourseInput extends AddCourseInput {

    @Field(() => ID)
    id: string;
}