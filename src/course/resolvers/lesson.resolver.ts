import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AddLessonInput, UpdateLessonInput } from '../dto';
import { Course, Lesson } from '../entities';
import { LessonService } from '../services';

@Resolver(() => Course)
export class LessonResolver {
    constructor (private lessonService: LessonService) {}

    @Query(() => Lesson, { nullable: true })
    lesson(@Args('id', { defaultValue: '', type: () => String }) id?: string): Promise<Lesson | undefined> {
        return this.lessonService.getLesson(id);
    }

    @Mutation(() => Lesson) 
    addLesson(@Args('newLesson') input: AddLessonInput): Promise<Lesson> {
        return this.lessonService.addLesson(input)
    }

    @Mutation(() => Lesson) 
    updateLesson(@Args('lesson') input: UpdateLessonInput): Promise<Lesson> {
        return this.lessonService.updateLesson(input)
    }
}
