/* eslint-disable prettier/prettier */
import { INotificationsRepository } from '@/domain/notification/application/repositories/notification-repository'
import { Notification } from '@/domain/notification/enterprise/entities/notification'

export class InMemoryNotificationsRepository implements INotificationsRepository {
  public items: Notification[] = []


  async create(notification: Notification): Promise<void> {
    this.items.push(notification)
  }
}
