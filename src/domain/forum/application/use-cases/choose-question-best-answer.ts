import { IAnswerRepository } from '../repositories/answer-repository'
import { Questions } from '@/domain/entities/questions'
import { IQuestionsRepository } from '../repositories/question-repository'

interface ChooseQuestionBestAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

interface ChooseQuestionBestAnswerUseCaseResponse {
  question: Questions
}

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private answerRepository: IAnswerRepository,
    private questionRepository: IQuestionsRepository,
  ) {
    return
  }

  async execute({
    answerId,
    authorId,
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    const question = await this.questionRepository.findById(
      answer.questionId.toString(),
    )

    if (!question) {
      throw new Error('Question not found')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not Allowed')
    }

    question.bestAnswerId = answer.id

    await this.questionRepository.save(question)

    return {
      question,
    }
  }
}
