import { IQuestionCommentsRepository } from '../repositories/question-comments-repository'

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string
  questionCommentId: string
}

export class DeleteQuestionCommentCase {
  constructor(private quetionCommentsRepository: IQuestionCommentsRepository) {
    return
  }

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest) {
    const questionComment =
      await this.quetionCommentsRepository.findById(questionCommentId)

    if (!questionComment) {
      throw new Error('Question comment not found')
    }

    if (questionComment.authorId.toString() !== authorId) {
      throw new Error('Not Allowed')
    }

    await this.quetionCommentsRepository.delete(questionComment)

    return {}
  }
}
