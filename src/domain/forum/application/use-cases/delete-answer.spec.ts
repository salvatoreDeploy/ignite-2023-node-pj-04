import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { DeleteAnswerUseCase } from './delete-answer'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { makeAnswer } from 'test/factories/makeAnswer'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: DeleteAnswerUseCase

describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswerRepository)
  })

  it('Should be able to delete answer by id', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('answer-1'),
    )

    inMemoryAnswerRepository.create(newAnswer)

    await sut.execute({ authorId: 'author-1', answerId: 'answer-1' })

    expect(inMemoryAnswerRepository.items).toHaveLength(0)
  })

  it('Should not be able to delete answer from another User', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('answer-1'),
    )

    inMemoryAnswerRepository.create(newAnswer)

    expect(() => {
      return sut.execute({ authorId: 'answer-2', answerId: 'question-1' })
    }).rejects.toBeInstanceOf(Error)
    expect(inMemoryAnswerRepository.items).toHaveLength(1)
  })
})
