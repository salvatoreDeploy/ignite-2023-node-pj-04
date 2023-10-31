/* eslint-disable @typescript-eslint/ban-types */

import { Either, right } from '@/core/either'
import { IQuestionsRepository } from '../repositories/question-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'

interface DeleteQuestionUseCaseRequest {
  authorId: string
  questionId: string
}

type DeleteQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>

export class DeleteQuestionUseCase {
  constructor(private questionRepository: IQuestionsRepository) {
    return
  }

  async execute({
    questionId,
    authorId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not exists.')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed')
    }
    await this.questionRepository.delete(question)

    return right({})
  }
}
