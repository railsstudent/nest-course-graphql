import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma'
import { Sentence } from '../entities'

@Injectable()
export class SentenceService {
  constructor(private service: PrismaService) {}

  async getSentences(lessonId: string): Promise<Sentence[]> {
    const sentences = await this.service.sentence.findMany({
      where: {
        lessonId,
      },
      include: {
        lesson: true,
      },
    })

    return Promise.resolve(sentences)
  }
}
