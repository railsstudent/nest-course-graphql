import { Injectable } from '@nestjs/common'
import { Sentence } from '../entities'
import data from '../assets/courses.json'

@Injectable()
export class SentenceService {
  sentences: Sentence[] = data.sentences.map((sentence) => {
    return {
      ...sentence,
      lesson: {
        ...sentence.lesson,
        createdAt: new Date(sentence?.lesson?.createdAt || Date.now()),
        updatedAt: new Date(sentence?.lesson?.updatedAt || Date.now()),
        course: null,
      },
      createdAt: new Date(sentence?.createdAt || Date.now()),
      updatedAt: new Date(sentence?.updatedAt || Date.now()),
    }
  })

  getSentences(lessonId: string): Promise<Sentence[]> {
    const sentences = this.sentences.filter((sentence) => {
      const currentLessonId = sentence?.lesson?.id || ''
      return currentLessonId === lessonId
    })
    return Promise.resolve(sentences)
  }
}
