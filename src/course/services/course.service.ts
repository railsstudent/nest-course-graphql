import { Injectable } from '@nestjs/common';
import { Course } from '../entities';

@Injectable()
export class CourseService {
    getCourses(): Promise<Course[]> {
        return  Promise.resolve([
            {
                id: '1',
                name: 'Latin Spanish',
                nativeName: 'Español Latino'
            },
            {
                id: '2',
                name: 'Brazilian Portuguese',
                nativeName: 'Português Brasileiro',
            }
        ]);
    }
}
