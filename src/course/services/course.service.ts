import { UserInputError } from 'apollo-server-express'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { AddCourseInput, CursorPaginationArgs, UpdateCourseInput } from '../dto'
import { Course, PaginatedItems } from '../entities'
import { UniqueHelper } from './unique.helper'

@Injectable()
export class CourseService {
  constructor(private readonly service: PrismaService, private readonly uniqueHelper: UniqueHelper) {}

  async getCourses(args: CursorPaginationArgs): Promise<PaginatedItems> {
    const { cursor = -1, limit = 4 } = args || {}

    const where =
      cursor < 0
        ? null
        : {
            createdAt: {
              gt: new Date(cursor),
            },
          }

    const baseOptions = {
      take: limit,
      orderBy: [
        {
          createdAt: 'asc',
        },
      ],
      include: {
        language: true,
      },
    }
    const findOptions: any = where ? { ...baseOptions, where } : baseOptions
    const courses = await this.service.course.findMany(findOptions)

    let nextCursor = -1
    if (courses && courses.length > 0) {
      nextCursor = courses[courses.length - 1].createdAt.getTime()
    }

    return {
      cursor: nextCursor,
      courses,
    }
  }

  getCourse(id: string): Promise<Course> {
    return this.uniqueHelper.findUniqueCourse({ id }, { language: true }, true)
  }

  async addCourse(input: AddCourseInput): Promise<Course> {
    const { name, description, languageId } = input

    await this.uniqueHelper.findUniqueLanguage({ id: languageId }, true)

    const course = await this.uniqueHelper.findUniqueCourse({ name }, null, false)
    if (course) {
      throw new UserInputError('Course name is already used')
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
      throw new UserInputError(`Course name/description is already used in ${duplicatedCourse?.language?.name}`)
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
