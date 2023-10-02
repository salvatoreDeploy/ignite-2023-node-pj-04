import { AnswerCommentProps } from '@/domain/entities/answer-comment'

interface IAnswerCommentsRepository {
  create(question: AnswerCommentProps): Promise<void>
}

export { IAnswerCommentsRepository }
