import { PrismaService } from 'src/prisma/prisma.service'
import { BadRequestException, Injectable } from '@nestjs/common'
import { AddCourseInput, UpdateCourseInput } from '../dto'
import { Course } from '../entities'

@Injectable()
export class CourseService {
  constructor(private readonly service: PrismaService) {}

  async getCourses(): Promise<Course[]> {
    return await this.service.course.findMany({
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
    return this.service.course.findUnique({
      where: {
        id,
      },
      include: {
        language: true,
      },
      rejectOnNotFound: true,
    })
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

    await this.service.course.findUnique({
      where: {
        id,
      },
      rejectOnNotFound: true,
    })

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
