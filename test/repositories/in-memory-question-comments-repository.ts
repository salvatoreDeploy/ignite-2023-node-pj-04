/* eslint-disable prettier/prettier */

import { QuestionComment } from '@/domain/entities/question-comment'
import { IQuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'

export class InMemoryQuestionCommentsRepository
  implements IQuestionCommentsRepository {

  public items: QuestionComment[] = []

  async create(questionComments: QuestionComment): Promise<void> {
    this.items.push(questionComments)
  }

  async delete(questionComment: QuestionComment): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === questionComment.id)

    this.items.splice(itemIndex, 1)
  }

  async findById(id: string): Promise<QuestionComment | null> {
    const questionComment = this.items.find((item) => item.id.toString() === id)

    if (!questionComment) {
      return null
    }

    return questionComment
  }

}
