import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { AddLanguageInput, UpdateLanguageInput } from '../dto'
import { Language, Sentence, Translation } from '../entities'
import { TranslationService } from '../services'

@Resolver(() => Sentence)
export class TranslationResolver {
  constructor(private translationService: TranslationService) {}

  @Query(() => Translation)
  async getTranslation(
    @Args('sentenceId') sentenceId: string,
    @Args('languageId') languageId: string,
  ): Promise<Translation> {
    return await this.translationService.getTranslation(sentenceId, languageId)
  }

  @Query(() => [Language])
  async getLanguages(): Promise<Language[]> {
    return await this.translationService.getLanguages()
  }

  @Mutation(() => Language)
  async addLanguage(@Args('newLanguage') input: AddLanguageInput): Promise<Language> {
    return await this.translationService.addLanguage(input)
  }

  @Mutation(() => Language)
  async updateLanguage(@Args('updateLanguage') input: UpdateLanguageInput): Promise<Language> {
    return await this.translationService.updateLanguage(input)
  }
}
