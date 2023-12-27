import { Notification } from '../../enterprise/entities/notification'

export interface INotificationsRepository {
  create(notification: Notification): Promise<void>
}
