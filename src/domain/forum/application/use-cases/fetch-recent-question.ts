import { Questions } from '@/domain/entities/questions'
import { IQuestionsRepository } from '../repositories/question-repository'

interface FetchRecentQuestionUseCaseRequest {
  page: number
}

interface FetchRecentQuestionUseCaseResponse {
  questions: Questions[]
}

export class FetchRecentQuestionUseCase {
  constructor(private questionRepository: IQuestionsRepository) {
    return
  }

  async execute({
    page,
  }: FetchRecentQuestionUseCaseRequest): Promise<FetchRecentQuestionUseCaseResponse> {
    const questions = await this.questionRepository.findManyToRecents({ page })

    return {
      questions,
    }
  }
}
