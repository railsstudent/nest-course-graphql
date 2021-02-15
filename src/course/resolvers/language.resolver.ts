import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import {
  AddTranslationInput,
  AddSentenceInput,
  UpdateSentenceInput,
  AddLanguageInput,
  UpdateLanguageInput,
} from '../dto'
import { Language, Sentence, Translation } from '../entities'
import { SentenceService, TranslationService } from '../services'

@Resolver(() => Language)
export class LanguageResolver {
  constructor(private readonly translationService: TranslationService) {}

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

  @ResolveField(() => String)
  async fullname(@Parent() language: Language): Promise<string> {
    return `${language.name} (${language.nativeName})`
  }
}
