import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Course } from "./course.entity";
import { Sentence } from "./sentence.entity";

@ObjectType()
export class Lesson {
    @Field(() => ID)
    id: string

    @Field(() => String, { nullable: true })
    name?: string

    createdAt?: Date

    updatedAt?: Date

    @Field(() => Course)
    course: Course

    @Field(() => [Sentence], { nullable: true })
    sentences?: Sentence[]
}