import { PrismaService } from 'src/prisma/prisma.service'
import { BadRequestException, Injectable } from '@nestjs/common'
import { AddCourseInput, PaginationArgs, UpdateCourseInput } from '../dto'
import { Course } from '../entities'
import { UniqueHelper } from './unique.helper'

@Injectable()
export class CourseService {
  constructor(private readonly service: PrismaService, private readonly uniqueHelper: UniqueHelper) {}

  async getCourses(args: PaginationArgs): Promise<Course[]> {
    const { offset = 0, limit = 8 } = args || {}

    return await this.service.course.findMany({
      skip: offset * limit,
      take: limit,
      orderBy: [
        {
          name: 'asc',
        },
      ],
      include: {
        language: true,
      },
    })
  }

  getCourse(id: string): Promise<Course> {
    return this.uniqueHelper.findUniqueCourse({ id }, { language: true }, true)
  }

  async addCourse(input: AddCourseInput): Promise<Course> {
    const { name, description, languageId } = input

    await this.uniqueHelper.findUniqueLanguage({ id: languageId }, true)

    const course = await this.uniqueHelper.findUniqueCourse({ name }, null, false)
    if (course) {
      throw new BadRequestException('Course name is already used')
    }

    return await this.service.course.create({
      data: {
        name,
        description,
        languageId,
      },
      include: {
        language: true,
      },
    })
  }

  async updateCourse(input: UpdateCourseInput): Promise<Course> {
    const { id, ...rest } = input

    await this.uniqueHelper.findUniqueCourse({ id }, null, true)

    const duplicatedCourse = await this.service.course.findFirst({
      where: {
        ...rest,
      },
      include: {
        language: true,
      },
    })

    if (duplicatedCourse && duplicatedCourse.id !== id) {
      throw new BadRequestException(`Course name/description is already used in ${duplicatedCourse?.language?.name}`)
    }

    return await this.service.course.update({
      data: {
        ...rest,
        updatedAt: new Date(Date.now()),
      },
      where: {
        id,
      },
      include: {
        language: true,
      },
    })
  }
}
