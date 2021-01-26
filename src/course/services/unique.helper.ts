import { Injectable } from '@nestjs/common'
import { PrismaService } from './../../prisma'
import { Prisma } from '@prisma/client'

@Injectable()
export class UniqueHelper {
  constructor(private readonly service: PrismaService) {}

  async findUniqueLanguage(where: Prisma.languageWhereUniqueInput, rejectOnNotFound = false) {
    return await this.service.language.findUnique({
      where,
      rejectOnNotFound,
    })
  }

  async findUniqueCourse(
    where: Prisma.courseWhereUniqueInput,
    include: Prisma.courseInclude | null,
    rejectOnNotFound = false,
  ) {
    return this.service.course.findUnique({
      where,
      include,
      rejectOnNotFound,
    })
  }
}
