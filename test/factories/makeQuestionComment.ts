import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { QuestionComment } from '@/domain/entities/question-comment'
import { QuestionProps } from '@/domain/entities/questions'
import { faker } from '@faker-js/faker'

export function makeQuestionComment(
  overriide: Partial<QuestionProps> = {},
  id?: UniqueEntityId,
) {
  const questionComment = QuestionComment.create(
    {
      questionId: new UniqueEntityId(),
      authorId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...overriide,
    },
    id,
  )

  return questionComment
}
