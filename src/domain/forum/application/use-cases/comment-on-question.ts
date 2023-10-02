import { IQuestionsRepository } from '../repositories/question-repository'
import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { QuestionComment } from '@/domain/entities/question-comment'
import { IQuestionCommentsRepository } from '../repositories/question-comments-repository'

interface CommentOnQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}

interface CommentOnQuestionCaseResponse {
  questionComment: QuestionComment
}

export class CommentOnQuestionCase {
  constructor(
    private questionRepository: IQuestionsRepository,
    private quetionCommentsRepository: IQuestionCommentsRepository,
  ) {
    return
  }

  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found')
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
      content,
    })

    await this.quetionCommentsRepository.create(questionComment)

    return { questionComment }
  }
}
