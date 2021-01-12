import { Injectable, NotFoundException } from '@nestjs/common';
import { AddCourseInput } from '../dto/add-course.dto';
import { Course } from '../entities';

const COURSES: Course[] = [
    {
        id: '1',
        name: 'Latin Spanish',
        nativeName: 'Español Latino',
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now())
    },
    {
        id: '2',
        name: 'Brazilian Portuguese',
        nativeName: 'Português Brasileiro',
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now())
    }
]

@Injectable()
export class CourseService {
    courses = [...COURSES]

    getCourses(): Promise<Course[]> {
        return  Promise.resolve(this.courses);
    }

    getCourse(id: string): Promise<Course> {
        const courses =  this.courses.filter(course => course.id === id)
        if (courses.length <= 0) {
            throw new NotFoundException(`Course ${id} does not exist`);
        }
        return Promise.resolve(courses[0]);
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

}
