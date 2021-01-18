import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AddLessonInput, UpdateLessonInput } from '../dto';
import { Lesson, Sentence } from '../entities';
import { LessonService, SentenceService } from '../services';

@Resolver(() => Lesson)
export class LessonResolver {
    constructor (private lessonService: LessonService, private sentenceService: SentenceService) {}

    @Query(() => Lesson, { nullable: true })
    async lesson(@Args('id', { defaultValue: '', type: () => String }) id?: string): Promise<Lesson | undefined> {
        return await this.lessonService.getLesson(id);
    }

    @Mutation(() => Lesson) 
    async addLesson(@Args('newLesson') input: AddLessonInput): Promise<Lesson> {
        return await this.lessonService.addLesson(input)
    }

    @Mutation(() => Lesson) 
    async updateLesson(@Args('lesson') input: UpdateLessonInput): Promise<Lesson> {
        return await this.lessonService.updateLesson(input)
    }

    @ResolveField()
    async sentences(@Parent() lesson: Lesson): Promise<Sentence[]> {
        const lessonId = lesson?.id || ''
        return await this.sentenceService.getSentences(lessonId)    
    }
}
