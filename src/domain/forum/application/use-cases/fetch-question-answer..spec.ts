import { makeAnswer } from 'test/factories/makeAnswer'
import { FetchQuestionAnswerUseCase } from './fetch-question-answer'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: FetchQuestionAnswerUseCase

describe('Fetch Questions Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new FetchQuestionAnswerUseCase(inMemoryAnswerRepository)
  })

  it('Should be able to fetch questions answer', async () => {
    await inMemoryAnswerRepository.create(
      makeAnswer({ questionId: new UniqueEntityId('question-1') }),
    )
    await inMemoryAnswerRepository.create(
      makeAnswer({ questionId: new UniqueEntityId('question-1') }),
    )
    await inMemoryAnswerRepository.create(
      makeAnswer({ questionId: new UniqueEntityId('question-1') }),
    )

    const { answers } = await sut.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(answers).toHaveLength(3)
  })

  it('Should be able to fetch questions answer', async () => {
    for (let i = 0; i < 22; i++) {
      await inMemoryAnswerRepository.create(
        makeAnswer({ questionId: new UniqueEntityId('question-1') }),
      )
    }

    const { answers } = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(answers).toHaveLength(2)
  })
})
