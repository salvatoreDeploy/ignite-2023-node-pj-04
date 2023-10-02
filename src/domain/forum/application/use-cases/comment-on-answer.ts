import { IAnswerRepository } from '../repositories/answer-repository'
import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { AnswerComment } from '@/domain/entities/answer-comment'
import { IAnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface CommentOnAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

interface CommentOnAnswerCaseResponse {
  answerComment: AnswerComment
}

export class CommentOnAnswerCase {
  constructor(
    private answerRepository: IAnswerRepository,
    private quetionCommentsRepository: IAnswerCommentsRepository,
  ) {
    return
  }

  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      answerId: new UniqueEntityId(answerId),
      content,
    })

    await this.quetionCommentsRepository.create(answerComment)

    return { answerComment }
  }
}
