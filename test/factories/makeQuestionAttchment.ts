/* eslint-disable prettier/prettier */

import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { QuestionAttachment, QuestionAttachmentProps } from '@/domain/forum/enterprise/entities/question-attachment'
import { faker } from '@faker-js/faker'

export function makeQuestionAttchment(
  overriide: Partial<QuestionAttachmentProps> = {},
  id?: UniqueEntityId,
) {
  const questionComment = QuestionAttachment.create(
    {
      questionId: new UniqueEntityId(),
      attachmentId: new UniqueEntityId(),
      ...overriide,
    },
    id,
  )

  return questionComment
}
