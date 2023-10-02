/* eslint-disable prettier/prettier */

import { AnswerComment } from '@/domain/entities/answer-comment'
import { IAnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'

export class InMemoryAnswerCommentsRepository
  implements IAnswerCommentsRepository {
  public items: AnswerComment[] = []

  async create(answerComments: AnswerComment): Promise<void> {
    this.items.push(answerComments)
  }
}