import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../prisma'
import { Language, Translation } from '../entities'
import { AddLanguageInput, AddTranslationInput } from '../dto'

@Injectable()
export class TranslationService {
  private async findLanguage(languageId: string) {
    return await this.service.language.findUnique({
      where: {
        id: languageId,
      },
    })
  }

  constructor(private service: PrismaService) {}

  async getTranslations(sentenceId: string): Promise<Translation[]> {
    const translations = await this.service.translation.findMany({
      where: {
        sentenceId,
      },
      orderBy: [
        {
          text: 'asc',
        },
      ],
      include: {
        language: true,
        sentence: true,
      },
    })
    return Promise.resolve(translations)
  }

  async addTranslation(input: AddTranslationInput): Promise<Translation> {
    const { text, languageId, sentenceId } = input

    const sentence = await this.service.sentence.findUnique({
      where: {
        id: sentenceId,
      },
      include: {
        translations: true,
      },
    })
    if (!sentence) {
      throw new NotFoundException('Sentence not found')
    }

    const language = await this.findLanguage(languageId)
    if (!language) {
      throw new NotFoundException('Language not found')
    }

    const isDuplicatedLang = sentence.translations.some((translation) => translation?.languageId === languageId)
    if (isDuplicatedLang) {
      const language = await this.findLanguage(languageId)
      throw new BadRequestException(`Translation is already added for language ${language?.name}`)
    }

    const duplTranslation = sentence.translations.find((translation) => translation?.text === text)
    if (duplTranslation) {
      const language = await this.findLanguage(duplTranslation.languageId)
      throw new BadRequestException(`${duplTranslation?.text} is already added for language ${language?.name}`)
    }

    const newTranslation = await this.service.translation.create({
      data: {
        text,
        languageId,
        sentenceId,
      },
      include: {
        sentence: true,
        language: true,
      },
    })
    return Promise.resolve(newTranslation)
  }

  async getLanguages(): Promise<Language[]> {
    return await this.service.language.findMany({
      orderBy: [
        {
          name: 'asc',
        },
      ],
    })
  }

  async addLanguage(input: AddLanguageInput): Promise<Language> {
    const { language } = input

    const existingLanguage = await this.service.language.findFirst({
      where: {
        name: {
          equals: language,
        },
      },
    })

    if (existingLanguage) {
      throw new BadRequestException('Language is already added')
    }

    const newLanguage = await this.service.language.create({
      data: {
        name: language,
      },
    })
    return Promise.resolve(newLanguage)
  }
}
