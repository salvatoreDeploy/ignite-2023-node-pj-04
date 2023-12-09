import { PaginationParams } from '@/core/repositories/pagination-params'
import { IQuestionsRepository } from '@/domain/forum/application/repositories/question-repository'
import { Questions } from '@/domain/forum/enterprise/entities/questions'

export class InMemoryQuestionsRepository implements IQuestionsRepository {
  public items: Questions[] = []

  async create(question: Questions): Promise<void> {
    this.items.push(question)
  }

  async findBySlug(slug: string): Promise<Questions | null> {
    const question = this.items.find((item) => item.slug.value === slug)

    if (!question) {
      return null
    }

    return question
  }

  async findById(id: string): Promise<Questions | null> {
    const question = this.items.find((item) => item.id.toString() === id)

    if (!question) {
      return null
    }

    return question
  }

  async findManyToRecents({ page }: PaginationParams): Promise<Questions[]> {
    const questions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return questions
  }

  async delete(question: Questions): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === question.id)

    this.items.splice(itemIndex, 1)
  }

  async save(question: Questions): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === question.id)

    this.items[itemIndex] = question
  }
}
