import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Create as Answer', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('Should be able to create new question', async () => {
    const result = await sut.execute({
      authorId: '1',
      content: 'Conteudo da pergunta',
      title: 'Titulo da pergunta ',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.question.content).toEqual('Conteudo da pergunta')
    expect(inMemoryQuestionsRepository.items[0]).toEqual(result.value?.question)
  })
})
