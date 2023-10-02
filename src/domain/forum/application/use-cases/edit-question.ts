import { Questions } from '@/domain/entities/questions'
import { IQuestionsRepository } from '../repositories/question-repository'

interface EditQuestionUseCaseRequest {
  authorId: string
  questionId: string
  title: string
  content: string
}

interface EditQuestionUseCaseResponse {
  question: Questions
}

export class EditQuestionUseCase {
  constructor(private questionRepository: IQuestionsRepository) {
    return
  }

  async execute({
    content,
    title,
    authorId,
    questionId,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not exists.')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed')
    }

    question.title = title
    question.content = content

    await this.questionRepository.save(question)

    return {
      question,
    }
  }
}
