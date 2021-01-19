import { Injectable, NotFoundException } from '@nestjs/common'
import { AddCourseInput, UpdateCourseInput } from '../dto'
import { Course } from '../entities'
import data from '../assets/courses.json'

@Injectable()
export class CourseService {
  courses: Course[] = data.courses.map((course) => {
    return {
      ...course,
      createdAt: new Date(course?.createdAt || Date.now()),
      updatedAt: new Date(course?.updatedAt || Date.now()),
    }
  })

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
    const newCourse = {
      id: `${this.courses.length + 1}`,
      name: input.name || '',
      nativeName: input.nativeName || '',
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    }
    this.courses.push(newCourse)
    return Promise.resolve(newCourse)
  }

  updateCourse(input: UpdateCourseInput): Promise<Course> {
    const { id } = input
    const course = this.courses.find((course) => course.id === id)
    if (!course) {
      throw new NotFoundException('Course is not found')
    }

    const updatedCourse: Course = {
      ...course,
      ...input,
    }

    this.courses = this.courses.map((course) => (course.id !== id ? course : updatedCourse))
    return Promise.resolve(updatedCourse)
  }
}
