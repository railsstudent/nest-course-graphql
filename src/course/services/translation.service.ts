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
    })
  }

  constructor(private readonly service: PrismaService) {}

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
    const { id, name, nativeName } = input

    await this.service.language.findUnique({
      where: {
        id,
      },
      rejectOnNotFound: true,
    })

    const language = await this.service.language.findFirst({
      where: {
        name,
        nativeName,
      },
    })

    if (language) {
      throw new BadRequestException(`${name}/${nativeName} is already added`)
    }

    return await this.service.language.update({
      data: {
        name,
        nativeName,
      },
      where: {
        id,
      },
    })
  }
}
