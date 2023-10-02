import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { EditAnswerUseCase } from './edit.answer'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { makeAnswer } from 'test/factories/makeAnswer'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: EditAnswerUseCase

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new EditAnswerUseCase(inMemoryAnswerRepository)
  })

  it('Should be able to edit question by id', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    )

    inMemoryAnswerRepository.create(newAnswer)

    await sut.execute({
      authorId: 'author-1',
      anwerId: newAnswer.id.toValue(),
      content: 'Conteudo editado',
    })

    expect(inMemoryAnswerRepository.items[0]).toMatchObject({
      content: 'Conteudo editado',
    })
  })

  it('Should not be able to edit question from another User', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    )

    inMemoryAnswerRepository.create(newAnswer)

    expect(() => {
      return sut.execute({
        authorId: 'author-2',
        anwerId: newAnswer.id.toValue(),
        content: 'Conteudo editado',
      })
    }).rejects.toBeInstanceOf(Error)
    expect(inMemoryAnswerRepository.items).toHaveLength(1)
  })
})
