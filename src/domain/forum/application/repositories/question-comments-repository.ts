import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionComment } from '@/domain/entities/question-comment'

interface IQuestionCommentsRepository {
  create(question: QuestionComment): Promise<void>
  findById(id: string): Promise<QuestionComment | null>
  findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<QuestionComment[]>
  delete(questionComment: QuestionComment): Promise<void>
}

export { IQuestionCommentsRepository }
