import { Language } from './../src/course/entities';
import { PrismaClient } from '@prisma/client'   
const prisma = new PrismaClient()

type LangType = {
    name: string,
    nativeName: string
}

enum TRANS_LANG {
  ENG = 'English',
  CHN = 'Chinese',
  POR = 'Portuguese',
}

type SentenceTranslation = {
  text: string,
  translations: {
    lang: TRANS_LANG,
    text: string
  }[]
}

const GreetingSentences: SentenceTranslation[] = [
  { 
    text: 'Buenos días',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'Good morning'
      },
      {
        lang: TRANS_LANG.POR,
        text: 'Bom dia'
      },
      {
        lang: TRANS_LANG.CHN,
        text: '早安'
      }
    ]
  }
  , { 
    text: 'Buenas tardes',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'Good afternoon'
      },
      {
        lang: TRANS_LANG.POR,
        text: 'Boa tarde'
      },
      {
        lang: TRANS_LANG.CHN,
        text: '午安'
      }
    ]
  },
  { 
    text: 'Buenas noches',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'Good evening'
      },
      {
        lang: TRANS_LANG.POR,
        text: 'Boa noite'
      },
      {
        lang: TRANS_LANG.CHN,
        text: '晚安'
      }
    ]
  },
  { 
    text: 'De nada',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'Your are welcome'
      },
      {
        lang: TRANS_LANG.POR,
        text: 'De nada'
      },
      {
        lang: TRANS_LANG.CHN,
        text: '別客氣'
      }
    ]
  },
  { 
    text: 'Mucho gusto',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'Nice to meet you'
      },
      {
        lang: TRANS_LANG.POR,
        text: 'Prazer em conhecê-lo'
      },
      {
        lang: TRANS_LANG.CHN,
        text: '很高興認識你'
      }
    ]
  },
  { 
    text: 'Adiós',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'Good bye'
      },
      {
        lang: TRANS_LANG.POR,
        text: 'TChau'
      },
      {
        lang: TRANS_LANG.CHN,
        text: '再見'
      }
    ]
  },
  { 
    text: 'Gracias',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'Thank you'
      },
      {
        lang: TRANS_LANG.POR,
        text: 'Obrigado'
      },
      {
        lang: TRANS_LANG.CHN,
        text: '謝謝'
      }
    ]
  },
  { 
    text: 'Muchas gracias',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'Many Thanks'
      },
      {
        lang: TRANS_LANG.POR,
        text: 'Muito Obrigado'
      },
      {
        lang: TRANS_LANG.CHN,
        text: '非常感謝你'
      }
    ]
  },
  { 
    text: 'Hasta luego',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'See you later'
      },
      {
        lang: TRANS_LANG.POR,
        text: 'Tchau'
      },
      {
        lang: TRANS_LANG.CHN,
        text: '回頭見'
      }
    ]
  },
  { 
    text: 'Hasta mañana',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'See you tomorrow'
      },
      {
        lang: TRANS_LANG.POR,
        text: 'Te vejo amanhã'
      },
      {
        lang: TRANS_LANG.CHN,
        text: '明天見'
      }
    ]
  },
  { 
    text: 'Estoy bien',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'I am good'
      },
      {
        lang: TRANS_LANG.POR,
        text: 'Estou bem'
      },
      {
        lang: TRANS_LANG.CHN,
        text: '我很好'
      }
    ]
  }
]

const GenderSentences = [
  { 
    text: 'Yo soy una mujer',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'I am a woman'
      },
      {
        lang: TRANS_LANG.POR,
        text: 'Eu sou uma mulher'
      },
      {
        lang: TRANS_LANG.CHN,
        text: '我是一個女人'
      }
    ]
  },
  { 
    text: 'Yo soy una niña',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'I am a girl'
      },
      {
        lang: TRANS_LANG.POR,
        text: 'Eu sou uma menina'
      },
      {
        lang: TRANS_LANG.CHN,
        text: '我是一個女孩'
      }
    ]
  },
  { 
    text: 'Ella es una mujer',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'She is a woman'
      },
      {
        lang: TRANS_LANG.POR,
        text: 'Ela é uma mulher'
      },
      {
        lang: TRANS_LANG.CHN,
        text: '她是一個女人'
      }
    ]
  },
  { 
    text: 'Ella es una niña',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'She is a girl'
      },
      {
        lang: TRANS_LANG.POR,
        text: 'Ela é uma menina'
      },
      {
        lang: TRANS_LANG.CHN,
        text: '她是一個女孩'
      }
    ]
  },
  { 
    text: 'Él es un niño',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'He is a boy'
      },
      {
        lang: TRANS_LANG.POR,
        text: 'Ele é um menino'
      },
      {
        lang: TRANS_LANG.CHN,
        text: '他是一個男孩'
      }
    ]
  },
  { 
    text: 'Él es un hombre',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'He is a man'
      },
      {
        lang: TRANS_LANG.POR,
        text: 'Ele é um homem'
      },
      {
        lang: TRANS_LANG.CHN,
        text: '他是一個男人'
      }
    ]
  },
]

const AvailableLanguages: LangType[] = [
  {
      name: 'English',
      nativeName: 'English'
  },
  {
      name: 'Chinese',
      nativeName: '中文'
  },
  {
      name: 'Spanish',
      nativeName: 'Español'
  },
  {
      name: 'Portuguese',
      nativeName: 'Português'
  }
]

const insertSetnences = async (sentences: SentenceTranslation[], lessonId: string, newLanguages: any[]) => {
  for (const sentence of sentences) {
    const newSentence = await prisma.sentence.create({
        data: {
            text: sentence.text,
            lessonId,
            createdAt:  new Date(Date.now()),
            updatedAt: new Date(Date.now()),    
        }
    })

    for (const translation of sentence.translations) {
      const { id: languageId } = newLanguages.find(lang => lang.name === translation.lang)
      await prisma.translation.create({
        data: {
            text: translation.text,
            languageId,
            sentenceId: newSentence.id,
            createdAt:  new Date(Date.now()),
            updatedAt: new Date(Date.now()),    
        }
      })
    }
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
  const newLanguages = []
  for (const language of AvailableLanguages) {
      const newLanguage = await prisma.language.create({
          data: {
              name: language.name,
              nativeName: language.nativeName,
              createdAt:  new Date(Date.now()),
              updatedAt: new Date(Date.now())
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
          description: 'Spanish course beginner level',
          createdAt:  new Date(Date.now()),
          updatedAt: new Date(Date.now()),
          languageId: spanish.id
      }
  })
  console.log('Insert courses - done')

  console.log('Insert lessons - start')
  const introductionLesson = await prisma.lesson.create({
      data: {
          name: 'Greeting',
          createdAt:  new Date(Date.now()),
          updatedAt: new Date(Date.now()),
          courseId: spanishCourse.id
      }
  })

  const genderLesson = await prisma.lesson.create({
    data: {
        name: 'Gender',
        createdAt:  new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        courseId: spanishCourse.id
    }
  })
  console.log('Insert lessons - done')

  console.log('Insert sentences - start')
  await insertSetnences(GreetingSentences, introductionLesson.id, newLanguages)
  await insertSetnences(GenderSentences, genderLesson.id, newLanguages)
  console.log('Insert sentences - end')
}

main()
    .catch(e => { 
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })