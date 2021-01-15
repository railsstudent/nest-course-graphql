import { ArgsType, Field, Int } from "@nestjs/graphql";
import { Min } from "class-validator";

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { defaultValue: 0 })
  @Min(0)
  offset: number;

  @Field(() => Int, { defaultValue: 10 })
  @Min(1)
  limit: number;
}