import { IQuestionsRepository } from '../repositories/question-repository'

interface DeleteQuestionUseCaseRequest {
  authorId: string
  questionId: string
}

export class DeleteQuestionUseCase {
  constructor(private questionRepository: IQuestionsRepository) {
    return
  }

  async execute({ questionId, authorId }: DeleteQuestionUseCaseRequest) {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not exists.')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed')
    }
    await this.questionRepository.delete(question)

    return {}
  }
}
