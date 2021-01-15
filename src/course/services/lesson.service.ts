import { Injectable, NotFoundException } from '@nestjs/common';
import { AddLessonInput, GetLessonArgs, UpdateLessonInput } from '../dto';
import { Lesson } from '../entities';

const spanishCourse = {
    id: '1',
    name: 'Latin Spanish',
    nativeName: 'Español Latino',
    createdAt: new Date(1610558940423),
    updatedAt: new Date(1610558940423)
}

const portCourse = {
    id: '2',
    name: 'Brazilian Portuguese',
    nativeName: 'Português Brasileiro',
    createdAt: new Date(1610558963135),
    updatedAt: new Date(1610558963135)
}

const COURSES = [spanishCourse, portCourse]

const LESSONS: Lesson[] = [
    {
        id: '1',
        name: 'Basic Phrase',
        createdAt: new Date(1610559052972),
        updatedAt: new Date(1610559052972),
        course: spanishCourse
    },
    {
        id: '2',
        name: 'Basic Phrase',
        createdAt: new Date(1610559067075),
        updatedAt: new Date(1610559067075),
        course: portCourse
    },
    {
        id: '3',
        name: 'Greeting',
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        course: spanishCourse
    },
    {
        id: '4',
        name: 'Weather',
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        course: portCourse
    },
    {
        id: '5',
        name: 'Routine',
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        course: spanishCourse
    },
    {
        id: '6',
        name: 'Shopping',
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        course: spanishCourse
    }
]

@Injectable()
export class LessonService {
    lessons = [...LESSONS];

    getPaginatedLessons(args: GetLessonArgs) {
        const { courseId, offset, limit } = args || {}
        console.log(courseId, offset, limit)

        return this.lessons
            .filter(lesson => lesson.course.id === courseId)
            .sort((a, b) => {
                const first = a.course.name.toLocaleLowerCase()
                const second = b.course.name.toLocaleLowerCase()
                return first.localeCompare(second)
            })
            .slice(offset, offset + limit);
    }

    addCourse(input: AddLessonInput): Promise<Lesson> {
        const { name, courseId } = input

        const course = COURSES.find(course => course.id === courseId)
        if (!course) {
            throw new NotFoundException('Course not found');
        }

        const newLesson: Lesson = {
            id: `${this.lessons.length + 1}`,
            name: name || '',
            createdAt: new Date(Date.now()),
            updatedAt: new Date(Date.now()),
            course
        }
        this.lessons.push(newLesson)
        return Promise.resolve(newLesson)
    }

    updateCourse(input: UpdateLessonInput): Promise<Lesson> {
        const { id } = input
        const course = this.courses.find(course => course.id === id)
        if (!course) {
            throw new NotFoundException('Course is not found')
        }

        const updatedCourse: Course = {
            ...course,
            ...input
        }

        this.courses = this.courses.map(course => course.id !== id ? course : updatedCourse)
        return Promise.resolve(updatedCourse)
    }
}
