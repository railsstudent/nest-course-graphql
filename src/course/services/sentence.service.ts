import { BadRequestException, Injectable } from '@nestjs/common'
import { createJSDocReturnTag } from 'typescript'
import { PrismaService } from '../../prisma'
import { AddSentenceInput, UpdateSentenceInput } from '../dto'
import { Lesson, Sentence } from '../entities'

@Injectable()
export class SentenceService {
  private async findLesson(lessonId: string): Promise<Lesson> {
    return await this.service.lesson.findUnique({
      where: {
        id: lessonId,
      },
      rejectOnNotFound: true,
    })
  }

  constructor(private readonly service: PrismaService) {}

  async addSentence(input: AddSentenceInput): Promise<Sentence> {
    const { text, lessonId } = input

    const lesson = await this.findLesson(lessonId)
    const sentence = await this.service.sentence.findFirst({
      where: {
        text,
        lessonId,
      },
      rejectOnNotFound: true,
    })

    if (sentence) {
      throw new BadRequestException(`${text} is found in ${lesson?.name} lesson`)
    }

    return await this.service.sentence.create({
      data: {
        text,
        lessonId,
      },
      include: {
        lesson: true,
      },
    })
  }

  async updateSentence(input: UpdateSentenceInput): Promise<Sentence> {
    const { id, ...rest } = input

    if (rest.lessonId) {
      await this.findLesson(rest.lessonId)
    }

    await this.service.sentence.findUnique({
      where: {
        id,
      },
      rejectOnNotFound: true,
    })

    const sentence = await this.service.sentence.findFirst({
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
      include: {
        lesson: true,
      },
    })

    if (sentence) {
      const { text = '' } = rest
      throw new BadRequestException(`${text} is found in ${sentence?.lesson?.name} lesson`)
    }

    return await this.service.sentence.update({
      data: {
        ...rest,
        updatedAt: new Date(Date.now()),
      },
      where: {
        id,
      },
      include: {
        lesson: true,
      },
    })
  }

  async getSentences(lessonId: string): Promise<Sentence[]> {
    return await this.service.sentence.findMany({
      where: {
        lessonId,
      },
      include: {
        lesson: true,
        translations: {
          include: {
            language: true,
          },
        },
      },
    })
  }

  async getSentence(sentenceId: string): Promise<Sentence> {
    return await this.service.sentence.findUnique({
      where: {
        id: sentenceId,
      },
      include: {
        lesson: true,
        translations: {
          include: {
            language: true,
          },
        },
      },
    })
  }
}
