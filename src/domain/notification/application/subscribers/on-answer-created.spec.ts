/* eslint-disable @typescript-eslint/no-unused-vars */
import { makeAnswer } from 'test/factories/makeAnswer'
import { OnAnswerCreated } from './on-answer-created'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { InMemoryAnswerAttachmentRepository } from 'test/repositories/in-memory-answer-attchment-repository'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let inMmemoryAttachmentsRepository: InMemoryAnswerAttachmentRepository

describe('On Answer Created', () => {
  beforeEach(() => {
    inMmemoryAttachmentsRepository = new InMemoryAnswerAttachmentRepository()
    inMemoryAnswerRepository = new InMemoryAnswerRepository(
      inMmemoryAttachmentsRepository,
    )
  })

  it('Should send a notification when an answer is created', () => {
    // Criando o subscriber, assim ouvindo o evento de um anova answer criada
    const _onAnsweCreated = new OnAnswerCreated()

    // Criando a answer
    const answer = makeAnswer()

    // Apos ter salvo a answer no banco de dados, ele dispara a notificação sobre a criação
    inMemoryAnswerRepository.create(answer)
  })
})
