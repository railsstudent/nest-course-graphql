import { Field, ID, ObjectType } from "@nestjs/graphql";

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
}