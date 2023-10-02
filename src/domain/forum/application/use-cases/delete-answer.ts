import { IAnswerRepository } from '../repositories/answer-repository'

interface DeleteAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

export class DeleteAnswerUseCase {
  constructor(private answerRepository: IAnswerRepository) {
    return
  }

  async execute({ answerId, authorId }: DeleteAnswerUseCaseRequest) {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('Question not exists.')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not allowed')
    }
    await this.answerRepository.delete(answer)

    return {}
  }
}
