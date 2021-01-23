import { PrismaService } from 'src/prisma/prisma.service'
import { BadRequestException, Injectable } from '@nestjs/common'
import { AddCourseInput, UpdateCourseInput } from '../dto'
import { Course } from '../entities'

@Injectable()
export class CourseService {
  constructor(private readonly service: PrismaService) {}

  async getCourses(): Promise<Course[]> {
    const courses = await this.service.course.findMany({
      orderBy: [
        {
          name: 'asc',
        },
      ],
      include: {
        language: true,
      },
    })

    return Promise.resolve(courses)
  }

  getCourse(id: string): Promise<Course> {
    const course = this.service.course.findUnique({
      where: {
        id,
      },
      include: {
        language: true,
      },
      rejectOnNotFound: true,
    })

    return Promise.resolve(course)
  }

  async addCourse(input: AddCourseInput): Promise<Course> {
    const { name, description, languageId } = input

    await this.service.language.findUnique({
      where: {
        id: languageId,
      },
      rejectOnNotFound: true,
    })

    const course = await this.service.course.findUnique({
      where: {
        name,
      },
    })

    if (course) {
      throw new BadRequestException('Course name is already used')
    }

    const newCourse = await this.service.course.create({
      data: {
        name,
        description,
        languageId,
      },
      include: {
        language: true,
      },
    })

    return Promise.resolve(newCourse)
  }

  async updateCourse(input: UpdateCourseInput): Promise<Course> {
    const { id, languageId = '', name = '', description = '' } = input

    if (!languageId) {
      throw new BadRequestException('Language is missing')
    }

    if (!name) {
      throw new BadRequestException('Course name is missing')
    }

    await this.service.course.findUnique({
      where: {
        id,
      },
      rejectOnNotFound: true,
    })

    const duplicatedCourse = this.service.course.findFirst({
      where: {
        name,
        languageId,
      },
      include: {
        language: true,
      },
    })

    if (duplicatedCourse) {
      throw new BadRequestException(`Coure name is already used for ${duplicatedCourse?.language?.name}`)
    }

    const updatedCourse = await this.service.course.update({
      data: {
        name,
        description,
        updatedAt: new Date(Date.now()),
      },
      where: {
        id,
      },
      include: {
        language: true,
      },
    })

    return Promise.resolve(updatedCourse)
  }
}
