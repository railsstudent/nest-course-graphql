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
            .slice(offset * limit, limit * (offset + 1));
    }

    getLesson(id: string): Promise<Lesson> {
        const lessons =  this.lessons.filter(lesson => lesson.id === id)
        if (lessons.length <= 0) {
            throw new NotFoundException(`Lesson ${id} does not exist`);
        }
        return Promise.resolve(lessons[0]);
    }

    addLesson(input: AddLessonInput): Promise<Lesson> {
        const { name, courseId } = input

        const course = COURSES.find(course => course.id === courseId)
        if (!course) {
            throw new NotFoundException('Course not found');
        }

        const isDuplicatedName = this.lessons.some(
            lesson => lesson.name === name && 
            lesson.course.id === courseId
        )
        if (isDuplicatedName) {
            throw new NotFoundException('Lesson name is already used');
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

    updateLesson(input: UpdateLessonInput): Promise<Lesson> {
        const { id, name } = input

        const existingLesson = this.lessons.find(lesson => lesson.id === id)
        if (!existingLesson) {
            throw new NotFoundException('Lesson not found');
        }

        const existingCourseId = existingLesson?.course?.id || ''
        const isDuplicatedName = this.lessons.some(
            lesson => lesson.name === name && 
            lesson.course.id === existingCourseId
        )
        if (isDuplicatedName) {
            throw new NotFoundException('Cannot update, lesson name is already used');
        }

        const updatedLesson: Lesson = {
            ...existingLesson,
            name
        }

        this.lessons = this.lessons.map(lesson => lesson.id !== id ? lesson : updatedLesson)
        return Promise.resolve(updatedLesson)
    }
}
