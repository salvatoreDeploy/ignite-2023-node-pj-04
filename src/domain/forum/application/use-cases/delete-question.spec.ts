import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/makeQuestion'
import { DeleteQuestionUseCase } from './delete-question'
import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase

describe('Delete Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('Should be able todelete question by id', async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    )

    inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({ authorId: 'author-1', questionId: 'question-1' })

    expect(inMemoryQuestionsRepository.items).toHaveLength(0)
  })

  it('Should not be able to delete question from another User', async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    )

    inMemoryQuestionsRepository.create(newQuestion)

    expect(() => {
      return sut.execute({ authorId: 'author-2', questionId: 'question-1' })
    }).rejects.toBeInstanceOf(Error)
    expect(inMemoryQuestionsRepository.items).toHaveLength(1)
  })
})
