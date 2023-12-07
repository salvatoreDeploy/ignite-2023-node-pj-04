import { AggregateRoot } from '@/core/entities/aggregate-root'
import { Slug } from './value-objects/slug'
import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { Optional } from '@/core/types/optional'
import dayjs from 'dayjs'
import { QuestionAttachment } from './question-attachment'

export interface QuestionProps {
  title: string
  content: string
  authorId: UniqueEntityId
  bestAnswerId?: UniqueEntityId
  attachment: QuestionAttachment[]
  slug: Slug
  createdAt: Date
  updatedAt?: Date
}

export class Questions extends AggregateRoot<QuestionProps> {
  get title() {
    return this.props.title
  }

  set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)
    this.touch()
  }

  get content() {
    return this.props.content
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  get authorId() {
    return this.props.authorId
  }

  get bestAnswerId() {
    return this.props.bestAnswerId
  }

  set bestAnswerId(bestAnswerId: UniqueEntityId | undefined) {
    this.props.bestAnswerId = bestAnswerId
    this.touch()
  }

  get slug() {
    return this.props.slug
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get isNew(): boolean {
    return dayjs().diff(this.createdAt) <= 3
  }

  private touch() {
    return (this.props.updatedAt = new Date())
  }

  get except() {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  get attachment() {
    return this.props.attachment
  }

  set attachment(attachment: QuestionAttachment[]) {
    this.props.attachment = attachment
  }

  static create(
    props: Optional<QuestionProps, 'createdAt' | 'slug' | 'attachment'>,
    id?: UniqueEntityId,
  ) {
    const question = new Questions(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        attachment: props.attachment ?? [],
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return question
  }
}