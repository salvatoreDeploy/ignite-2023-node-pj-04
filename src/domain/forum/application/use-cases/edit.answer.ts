import { Answer } from '@/domain/entities/answer'
import { IAnswerRepository } from '../repositories/answer-repository'

interface EditAnswerUseCaseRequest {
  authorId: string
  anwerId: string
  content: string
}

interface EditAnswerUseCaseResponse {
  answer: Answer
}

export class EditAnswerUseCase {
  constructor(private questionRepository: IAnswerRepository) {
    return
  }

  async execute({
    anwerId,
    authorId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.questionRepository.findById(anwerId)

    if (!answer) {
      throw new Error('Question not exists.')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not allowed')
    }

    answer.content = content

    await this.questionRepository.save(answer)

    return {
      answer,
    }
  }
}
