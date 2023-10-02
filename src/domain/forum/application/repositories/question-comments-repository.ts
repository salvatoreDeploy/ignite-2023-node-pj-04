import { QuestionComment } from '@/domain/entities/question-comment'

interface IQuestionCommentsRepository {
  create(question: QuestionComment): Promise<void>
  findById(id: string): Promise<QuestionComment | null>
  delete(questionComment: QuestionComment): Promise<void>
}

export { IQuestionCommentsRepository }
