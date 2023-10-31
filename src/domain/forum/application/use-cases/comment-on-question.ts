import { IQuestionsRepository } from '../repositories/question-repository'
import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { QuestionComment } from '@/domain/entities/question-comment'
import { IQuestionCommentsRepository } from '../repositories/question-comments-repository'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'

interface CommentOnQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}

type CommentOnQuestionCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    questionComment: QuestionComment
  }
>

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
      return left(new NotAllowedError())
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
      content,
    })

    await this.quetionCommentsRepository.create(questionComment)

    return right({ questionComment })
  }
}
