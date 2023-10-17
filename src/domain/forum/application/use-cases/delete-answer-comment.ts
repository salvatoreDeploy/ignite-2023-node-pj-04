/* eslint-disable @typescript-eslint/ban-types */

import { Either, left, right } from '@/core/either'
import { IAnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}

type DeleteAnswerCommentUseCaseResponse = Either<string, {}>

export class DeleteAnswerCommentCase {
  constructor(private quetionCommentsRepository: IAnswerCommentsRepository) {
    return
  }

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment =
      await this.quetionCommentsRepository.findById(answerCommentId)

    if (!answerComment) {
      return left('Answer comment not found')
    }

    if (answerComment.authorId.toString() !== authorId) {
      return left('Not Allowed')
    }

    await this.quetionCommentsRepository.delete(answerComment)

    return right({})
  }
}
