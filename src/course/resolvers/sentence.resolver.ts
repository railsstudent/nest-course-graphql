import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { Sentence, Translation } from '../entities'
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
