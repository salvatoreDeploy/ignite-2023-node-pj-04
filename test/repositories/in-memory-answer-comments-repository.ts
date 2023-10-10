/* eslint-disable prettier/prettier */

import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerComment } from '@/domain/entities/answer-comment'
import { IAnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'

export class InMemoryAnswerCommentsRepository
  implements IAnswerCommentsRepository {

  public items: AnswerComment[] = []

  async create(answerComments: AnswerComment): Promise<void> {
    this.items.push(answerComments)
  }

  async delete(answerComments: AnswerComment): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === answerComments.id)

    this.items.splice(itemIndex, 1)
  }

  async findById(id: string): Promise<AnswerComment | null> {
    const questionComment = this.items.find((item) => item.id.toString() === id)

    if (!questionComment) {
      return null
    }

    return questionComment
  }

  async findManyByAnswerId(
    answerId: string,
    { page }: PaginationParams,
  ): Promise<AnswerComment[]> {
    const questionComments = this.items
      .filter((item) => item.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20)

    return questionComments
  }
}