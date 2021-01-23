import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../prisma'
import { Language, Translation } from '../entities'
import { AddLanguageInput, AddTranslationInput, UpdateLanguageInput } from '../dto'

@Injectable()
export class TranslationService {
  private async findLanguage(languageId: string) {
    return await this.service.language.findUnique({
      where: {
        id: languageId,
      },
      rejectOnNotFound: true,
    })
  }

  constructor(private readonly service: PrismaService) {}

  async getTranslations(sentenceId: string): Promise<Translation[]> {
    return await this.service.translation.findMany({
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
  }

  async addTranslation(input: AddTranslationInput): Promise<Translation> {
    const { text, languageId, sentenceId } = input

    await this.findLanguage(languageId)

    const sentence = await this.service.sentence.findUnique({
      where: {
        id: sentenceId,
      },
      include: {
        translations: true,
      },
      rejectOnNotFound: true,
    })

    const duplicatedLang = sentence.translations.some((translation) => translation?.languageId === languageId)
    if (duplicatedLang) {
      const language = await this.findLanguage(languageId)
      throw new BadRequestException(`Translation is already added for language ${language?.name}`)
    }

    const duplTranslation = sentence.translations.find((translation) => translation?.text === text)
    if (duplTranslation) {
      const language = await this.findLanguage(duplTranslation.languageId)
      throw new BadRequestException(`${duplTranslation?.text} is already added for language ${language?.name}`)
    }

    return await this.service.translation.create({
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
    const { name, nativeName } = input

    const existingLanguage = await this.service.language.findFirst({
      where: {
        name: {
          equals: name,
        },
      },
    })

    if (existingLanguage) {
      throw new BadRequestException(`${name} is already added`)
    }

    return await this.service.language.create({
      data: {
        name,
        nativeName,
      },
    })
  }

  async updateLanguage(input: UpdateLanguageInput): Promise<Language> {
    const { id, ...rest } = input

    await this.service.language.findUnique({
      where: {
        id,
      },
      rejectOnNotFound: true,
    })

    const language = await this.service.language.findFirst({
      where: {
        AND: [
          {
            ...rest,
          },
        ],
        NOT: [
          {
            id: {
              equals: id,
            },
          },
        ],
      },
    })

    if (language) {
      const { name = '', nativeName = '' } = rest
      const pair = `${name}${name && nativeName ? '/' : ''}${nativeName}`
      throw new BadRequestException(`${pair} already exists`)
    }

    return await this.service.language.update({
      data: {
        ...rest,
      },
      where: {
        id,
      },
    })
  }
}
