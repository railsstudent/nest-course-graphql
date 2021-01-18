import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Lesson } from "./lesson.entity";

@ObjectType()
export class Sentence {
    @Field(() => ID)
    id: string

    @Field(() => String, { nullable: true })
    text?: string

    createdAt?: Date

    updatedAt?: Date

    @Field(() => Lesson)
    lesson: Lesson
}