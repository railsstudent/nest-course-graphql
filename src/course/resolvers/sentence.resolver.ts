import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { AddLanguageInput, AddTranslationInput } from '../dto'
import { Language, Sentence, Translation } from '../entities'
import { TranslationService } from '../services'

@Resolver(() => Sentence)
export class SentenceResolver {
  constructor(private translationService: TranslationService) {}

  @ResolveField()
  async translations(@Parent() sentence: Sentence): Promise<Translation[]> {
    const sentenceId = sentence?.id || ''
    return await this.translationService.getTranslations(sentenceId)
  }
}
