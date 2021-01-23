import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { AddLanguageInput, AddTranslationInput } from '../dto'
import { Language, Sentence, Translation } from '../entities'
import { TranslationService } from '../services'

@Resolver(() => Sentence)
export class TranslationResolver {
  constructor(private translationService: TranslationService) {}

  @Query(() => [Language])
  async getLanguages(): Promise<Language[]> {
    return await this.translationService.getLanguages()
  }

  @Mutation(() => Language)
  async addLanguage(@Args('newLanguage') input: AddLanguageInput): Promise<Language> {
    return await this.translationService.addLanguage(input)
  }

  @Mutation(() => Translation)
  async addTranslation(@Args('newTranslation') input: AddTranslationInput): Promise<Translation> {
    return await this.translationService.addTranslation(input)
  }
}
