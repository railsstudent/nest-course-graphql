import { PrismaClient } from '@prisma/client' 
import { Language } from '../src/course/entities/language.entity';
import { SentenceTranslation, GreetingSentences, GenderSentences, IntroSentences, AvailableLanguages, ActivitySentences, DescriptionSentences } from './samples';
const prisma = new PrismaClient()

const insertSetnences = async (sentences: SentenceTranslation[], lessonId: string, newLanguages: any[]) => {
  for (const sentence of sentences) {
    const newSentence = await prisma.sentence.create({
        data: {
          text: sentence.text,
          lessonId,
        }
    })

    const translations = sentence.translations.map(translation => {
      const { id: languageId } = newLanguages.find(lang => lang.name === translation.lang)
      return {
        text: translation.text,
        languageId,
        sentenceId: newSentence.id,
      }
    })

    await prisma.translation.createMany({
      data: translations
    })
  } 
}

async function main() {
  console.log('Delete all records')
  await prisma.translation.deleteMany()
  await prisma.sentence.deleteMany()
  await prisma.lesson.deleteMany()
  await prisma.course.deleteMany()
  await prisma.language.deleteMany()

  console.log('Insert languages - start')
  const newLanguages: Language[] = []
  for (const language of AvailableLanguages) {
      const newLanguage = await prisma.language.create({
        data: {
          name: language.name,
          nativeName: language.nativeName,
        }
      })
      newLanguages.push(newLanguage)
  }
  console.log('Insert languages - done')

  console.log('Insert courses - start')
  const spanish = newLanguages.find(lang => lang.name === 'Spanish')
  const spanishCourse = await prisma.course.create({
      data: {
        name: 'Spanish 101',
        description: 'First Spanish course for beginners',
        languageId: spanish.id
      }
  })

  const spanishCourse2 = await prisma.course.create({
    data: {
        name: 'Spanish 102',
        description: 'Second Spanish course for beginners',
        languageId: spanish.id
    }
  })
  console.log('Insert courses - done')

  console.log('Insert lessons - start')
  const createLessonPromises = ['Greeting', 'Gender', 'Introduction', 'Activity', 'Description of persons'].map(
    async (name, index) => 
      await prisma.lesson.create({
        data: {
          name,
          courseId: index < 3 ? spanishCourse.id : spanishCourse2.id    
        }
      })
  )

  const [
    introductionLesson, 
    genderLesson, 
    introLesson, 
    activityLesson, 
    descriptionLesson
  ] = await Promise.all(createLessonPromises)
  console.log('Insert lessons - done')

  console.log('Insert sentences - start')
  await insertSetnences(GreetingSentences, introductionLesson.id, newLanguages)
  await insertSetnences(GenderSentences, genderLesson.id, newLanguages)
  await insertSetnences(IntroSentences, introLesson.id, newLanguages)
  await insertSetnences(ActivitySentences, activityLesson.id, newLanguages)
  await insertSetnences(DescriptionSentences, descriptionLesson.id, newLanguages)
  console.log('Insert sentences - end')
}

main()
    .catch(e => { 
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })