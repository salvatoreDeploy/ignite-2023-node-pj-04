import { Questions } from '@/domain/entities/questions'
import { IQuestionsRepository } from '../repositories/question-repository'
import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'

interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
}

interface CreateQuestionUseCaseResponse {
  question: Questions
}

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

    return {
      question,
    }
  }
}
