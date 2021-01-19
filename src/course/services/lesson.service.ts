import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { AddLessonInput, GetLessonArgs, UpdateLessonInput } from '../dto'
import { Course, Lesson } from '../entities'
import data from '../assets/courses.json'

@Injectable()
export class LessonService {
  lessons: Lesson[] = data.lessons.map((lesson) => {
    return {
      ...lesson,
      course: {
        ...lesson.course,
        createdAt: new Date(lesson?.course?.createdAt || Date.now()),
        updatedAt: new Date(lesson?.course?.updatedAt || Date.now()),
      },
      createdAt: new Date(lesson?.createdAt || Date.now()),
      updatedAt: new Date(lesson?.updatedAt || Date.now()),
    }
  })

  courses: Course[] = data.courses.map((course) => {
    return {
      ...course,
      createdAt: new Date(course?.createdAt || Date.now()),
      updatedAt: new Date(course?.updatedAt || Date.now()),
    }
  })

  getPaginatedLessons(args: GetLessonArgs): Promise<Lesson[]> {
    const { courseId, offset, limit } = args || {}

    const lessons = this.lessons
      .filter((lesson) => lesson.course.id === courseId)
      .sort((a, b) => {
        const first = a.course.name.toLocaleLowerCase()
        const second = b.course.name.toLocaleLowerCase()
        return first.localeCompare(second)
      })
      .slice(offset * limit, limit * (offset + 1))
    return Promise.resolve(lessons)
  }

  getLesson(id: string): Promise<Lesson> {
    const lessons = this.lessons.filter((lesson) => lesson.id === id)
    if (lessons.length <= 0) {
      throw new NotFoundException(`Lesson ${id} does not exist`)
    }
    return Promise.resolve(lessons[0])
  }

  addLesson(input: AddLessonInput): Promise<Lesson> {
    const { name, courseId } = input

    const course = this.courses.find((course) => course.id === courseId)
    if (!course) {
      throw new NotFoundException('Course not found')
    }

    const isDuplicatedName = this.lessons.some((lesson) => lesson.name === name && lesson.course.id === courseId)
    if (isDuplicatedName) {
      throw new BadRequestException('Lesson name is already used')
    }

    const newLesson: Lesson = {
      id: `${this.lessons.length + 1}`,
      name: name || '',
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      course,
    }
    this.lessons.push(newLesson)
    return Promise.resolve(newLesson)
  }

  updateLesson(input: UpdateLessonInput): Promise<Lesson> {
    const { id, name } = input

    const existingLesson = this.lessons.find((lesson) => lesson.id === id)
    if (!existingLesson) {
      throw new NotFoundException('Lesson not found')
    }

    const existingCourseId = existingLesson?.course?.id || ''
    const isDuplicatedName = this.lessons.some(
      (lesson) => lesson.name === name && lesson.course.id === existingCourseId,
    )
    if (isDuplicatedName) {
      throw new BadRequestException('Cannot update, lesson name is already used')
    }

    const updatedLesson: Lesson = {
      ...existingLesson,
      name,
    }

    this.lessons = this.lessons.map((lesson) => (lesson.id !== id ? lesson : updatedLesson))
    return Promise.resolve(updatedLesson)
  }
}
