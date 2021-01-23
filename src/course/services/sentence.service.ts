import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma'
import { Sentence } from '../entities'

@Injectable()
export class SentenceService {
  constructor(private readonly service: PrismaService) {}

  async getSentences(lessonId: string): Promise<Sentence[]> {
    return await this.service.sentence.findMany({
      where: {
        lessonId,
      },
      include: {
        lesson: true,
      },
    })
  }
}
