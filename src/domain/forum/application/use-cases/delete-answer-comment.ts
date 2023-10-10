import { IAnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}

export class DeleteAnswerCommentCase {
  constructor(private quetionCommentsRepository: IAnswerCommentsRepository) {
    return
  }

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest) {
    const answerComment =
      await this.quetionCommentsRepository.findById(answerCommentId)

    if (!answerComment) {
      throw new Error('Answer comment not found')
    }

    if (answerComment.authorId.toString() !== authorId) {
      throw new Error('Not Allowed')
    }

    await this.quetionCommentsRepository.delete(answerComment)

    return {}
  }
}
