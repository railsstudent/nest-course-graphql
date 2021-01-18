import { Injectable } from '@nestjs/common'
import { Sentence } from '../entities'
import data from '../assets/data.json'

@Injectable()
export class SentenceService {
  sentences: Sentence[] = data.sentences.map((sentence) => {
    return {
      ...sentence,
      lesson: {
        ...sentence.lesson,
        course: {
          ...sentence.lesson.course,
          createdAt: new Date(sentence?.lesson?.course?.createdAt || Date.now()),
          updatedAt: new Date(sentence?.lesson?.course?.updatedAt || Date.now()),
        },
        createdAt: new Date(sentence?.lesson?.createdAt || Date.now()),
        updatedAt: new Date(sentence?.lesson?.updatedAt || Date.now()),
      },
      createdAt: new Date(sentence?.createdAt || Date.now()),
      updatedAt: new Date(sentence?.updatedAt || Date.now()),
    }
  })

  getSentences(lessonId: string) {
    const sentences = this.sentences.filter((sentence) => {
      const currentLessonId = sentence?.lesson?.id || ''
      return currentLessonId === lessonId
    })
    return Promise.resolve(sentences)
  }
}
