import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { AddTranslationInput, AddSentenceInput, UpdateSentenceInput } from '../dto'
import { Sentence, Translation } from '../entities'
import { SentenceService, TranslationService } from '../services'

@Resolver(() => Sentence)
export class SentenceResolver {
  constructor(
    private readonly sentenceService: SentenceService,
    private readonly translationService: TranslationService,
  ) {}

  @Query(() => Sentence)
  async getSentence(@Args('id', { defaultValue: '', type: () => String }) id: string): Promise<Sentence> {
    return await this.sentenceService.getSentence(id)
  }

  @Mutation(() => Sentence)
  async addSentence(@Args('newSentence') input: AddSentenceInput): Promise<Sentence> {
    return await this.sentenceService.addSentence(input)
  }

  @Mutation(() => Sentence)
  async updateSentence(@Args('updateSentence') input: UpdateSentenceInput): Promise<Sentence> {
    return await this.sentenceService.updateSentence(input)
  }

  @Mutation(() => Translation)
  async addTranslation(@Args('newTranslation') input: AddTranslationInput): Promise<Translation> {
    return await this.translationService.addTranslation(input)
  }

  @ResolveField()
  async translations(@Parent() sentence: Sentence): Promise<Translation[]> {
    const sentenceId = sentence?.id || ''
    return await this.translationService.getTranslations(sentenceId)
  }
}
