import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { Language, Sentence, Translation } from '../entities'
import data from '../assets/translations.json'
import courseData from '../assets/courses.json'
import { AddLanguageInput, AddTranslationInput } from '../dto'

@Injectable()
export class TranslationService {
  translations: Translation[] = data.translations.map((translate) => {
    return {
      ...translate,
      language: {
        ...translate?.language,
        createdAt: new Date(translate?.language?.createdAt || Date.now()),
        updatedAt: new Date(translate?.language?.updatedAt || Date.now()),
      },
      sentence: {
        ...translate?.sentence,
        createdAt: new Date(translate?.sentence?.createdAt || Date.now()),
        updatedAt: new Date(translate?.sentence?.updatedAt || Date.now()),
      },
      createdAt: new Date(translate?.createdAt || Date.now()),
      updatedAt: new Date(translate?.updatedAt || Date.now()),
    }
  })

  languages: Language[] = (data as any).languages.map((langauge) => {
    return {
      ...langauge,
      createdAt: new Date(langauge?.createdAt || Date.now()),
      updatedAt: new Date(langauge?.updatedAt || Date.now()),
    }
  })

  sentences: Sentence[] = courseData.sentences.map((sentence) => {
    return {
      ...sentence,
      createdAt: new Date(sentence?.createdAt || Date.now()),
      updatedAt: new Date(sentence?.updatedAt || Date.now()),
      lesson: {
        ...sentence.lesson,
        createdAt: new Date(sentence?.lesson?.createdAt || Date.now()),
        updatedAt: new Date(sentence?.lesson?.updatedAt || Date.now()),
        course: {
          ...sentence?.lesson?.course,
          createdAt: new Date(sentence?.lesson?.course?.createdAt || Date.now()),
          updatedAt: new Date(sentence?.lesson?.course?.updatedAt || Date.now()),
        },
      },
    }
  })

  getTranslations(sentenceId: string): Promise<Translation[]> {
    const translations = this.translations
      .filter((translation) => {
        const currentSentenceId = translation?.sentence?.id || ''
        return currentSentenceId === sentenceId
      })
      .sort((a, b) => a.text.localeCompare(b.text))
    return Promise.resolve(translations)
  }

  async addTranslation(input: AddTranslationInput): Promise<Translation> {
    const { text, languageId, sentenceId } = input

    const sentence = this.sentences.find((sentence) => sentence.id === sentenceId)
    if (!sentence) {
      throw new NotFoundException('Sentence not found')
    }

    const language = this.languages.find((lang) => lang.id === languageId)
    if (!language) {
      throw new NotFoundException('Language not found')
    }

    const isDuplicatedLang = this.translations.some((translation) => translation?.language?.id === languageId)
    if (isDuplicatedLang) {
      throw new BadRequestException(`Translation is already added for language ${language.language}`)
    }

    const duplTranslation = this.translations.find((translation) => translation?.text === text)
    if (duplTranslation) {
      throw new BadRequestException(
        `${duplTranslation?.text} is already added for language ${duplTranslation?.language?.language}`,
      )
    }

    const newTranslation: Translation = {
      id: `${this.languages.length + 1}`,
      text: text || '',
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      language,
      sentence,
    }
    this.translations.push(newTranslation)
    return Promise.resolve(newTranslation)
  }

  async getLangauges(): Promise<Language[]> {
    return await this.languages.sort((a, b) => a.language.localeCompare(b.language))
  }

  async addLanguage(input: AddLanguageInput): Promise<Language> {
    const { language } = input

    const isDuplicateLanguage = this.languages.find((lang) => lang.language === language)
    if (isDuplicateLanguage) {
      throw new BadRequestException('Language is already added')
    }

    const newLanguage: Language = {
      id: `${this.languages.length + 1}`,
      language: language || '',
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    }
    this.languages.push(newLanguage)
    return Promise.resolve(newLanguage)
  }
}
