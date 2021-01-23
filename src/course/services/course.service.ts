import { Injectable, NotFoundException } from '@nestjs/common'
import { AddCourseInput, UpdateCourseInput } from '../dto'
import { Course } from '../entities'

@Injectable()
export class CourseService {
  courses: Course[] = []

  getCourses(): Promise<Course[]> {
    return Promise.resolve(this.courses)
  }

  getCourse(id: string): Promise<Course> {
    const courses = this.courses.filter((course) => course.id === id)
    if (courses.length <= 0) {
      throw new NotFoundException(`Course ${id} does not exist`)
    }
    return Promise.resolve(courses[0])
  }

  addCourse(input: AddCourseInput): Promise<Course> {
    const newCourse: Course = {
      id: `${this.courses.length + 1}`,
      name: input.name || '',
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      language: {
        id: '46fd0057-eeb7-4278-bf05-af1aa485d1f4',
        name: 'Spanish',
        nativeName: 'Español',
        createdAt: new Date(1610559052972),
        updatedAt: new Date(1610559052972),
      },
    }
    this.courses.push(newCourse)
    return Promise.resolve(newCourse)
  }

  updateCourse(input: UpdateCourseInput): Promise<Course> {
    const { id, languageId = '', name = '' } = input
    const course = this.courses.find((course) => course.id === id)
    if (!course) {
      throw new NotFoundException('Course is not found')
    }

    const updatedCourse: Course = {
      ...course,
      name,
      language: {
        id: '46fd0057-eeb7-4278-bf05-af1aa485d1f4',
        name: 'Spanish',
        nativeName: 'Español',
        createdAt: new Date(1610559052972),
        updatedAt: new Date(1610559052972),
      },
    }

    this.courses = this.courses.map((course) => (course.id !== id ? course : updatedCourse))
    return Promise.resolve(updatedCourse)
  }
}
