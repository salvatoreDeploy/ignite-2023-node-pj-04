import { IQuestionsRepository } from '../repositories/question-repository'
import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { Either, right } from '@/core/either'
import { Questions } from '../../enterprise/entities/questions'

interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
}

type CreateQuestionUseCaseResponse = Either<
  null,
  {
    question: Questions
  }
>

export class CreateQuestionUseCase {
  constructor(private questionRepository: IQuestionsRepository) {
    return
  }

  async execute({
    authorId,
    title,
    content,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Questions.create({
      authorId: new UniqueEntityId(authorId),
      title,
      content,
    })

    await this.questionRepository.create(question)

    return right({
      question,
    })
  }
}
