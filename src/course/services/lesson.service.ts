import { PrismaService } from 'src/prisma/prisma.service'
import { BadRequestException, Injectable } from '@nestjs/common'
import { AddLessonInput, GetLessonArgs, UpdateLessonInput } from '../dto'
import { Lesson } from '../entities'

@Injectable()
export class LessonService {
  constructor(private service: PrismaService) {}

  async getPaginatedLessons(args: GetLessonArgs): Promise<Lesson[]> {
    const { courseId, offset, limit } = args || {}

    const lessons = await this.service.lesson.findMany({
      where: {
        courseId,
      },
      skip: offset * limit,
      take: limit,
      orderBy: [
        {
          name: 'asc',
        },
      ],
      include: {
        course: true,
      },
    })

    return Promise.resolve(lessons)
  }

  async getLesson(id: string): Promise<Lesson> {
    const lesson = await this.service.lesson.findUnique({
      where: {
        id,
      },
      include: {
        course: true,
      },
      rejectOnNotFound: true,
    })

    return Promise.resolve(lesson)
  }

  async addLesson(input: AddLessonInput): Promise<Lesson> {
    const { name, courseId } = input

    await this.service.course.findUnique({
      where: {
        id: courseId,
      },
      rejectOnNotFound: true,
    })

    const lesson = await this.service.lesson.findFirst({
      where: {
        name: {
          equals: name,
        },
        courseId: {
          equals: courseId,
        },
      },
    })

    if (lesson) {
      throw new BadRequestException('Lesson name is already used')
    }

    const newLesson = await this.service.lesson.create({
      data: {
        name,
        courseId,
      },
      include: {
        course: true,
      },
    })

    return Promise.resolve(newLesson)
  }

  async updateLesson(input: UpdateLessonInput): Promise<Lesson> {
    const { id, name } = input

    const existingLesson = await this.service.lesson.findUnique({
      where: {
        id,
      },
      include: {
        course: true,
      },
      rejectOnNotFound: true,
    })

    const courseId = existingLesson?.course?.id || ''
    const duplicatedLesson = await this.service.lesson.findFirst({
      where: {
        name: {
          equals: name,
        },
        courseId: {
          equals: courseId,
        },
      },
    })

    if (duplicatedLesson) {
      throw new BadRequestException('Cannot update, lesson name is already used')
    }

    const updatedLesson = await this.service.lesson.update({
      data: {
        name,
        updatedAt: new Date(Date.now()),
      },
      where: {
        id,
      },
      include: {
        course: true,
      },
    })

    return Promise.resolve(updatedLesson)
  }
}
