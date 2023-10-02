import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { AnswerQuestionUseCase } from './answer-question'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: AnswerQuestionUseCase

describe('Create as Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository)
  })

  it('Should be able to create new answer', async () => {
    const { answer } = await sut.execute({
      instructorId: '1',
      questionId: '2',
      content: 'New Question',
    })

    expect(answer.content).toEqual('New Question')
    expect(inMemoryAnswerRepository.items[0].id).toEqual(answer.id)
  })
})
