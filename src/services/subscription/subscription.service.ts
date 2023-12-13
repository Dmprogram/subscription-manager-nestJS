import { instance } from '../../api/api.interceptor'
import { TSubscription } from '../../types/subscription'

const SUBSCRIPTIONS = 'subscriptions'
export const SubscriptionService = {
  async getAll() {
    return instance<TSubscription[]>({
      url: SUBSCRIPTIONS,
      method: 'GET',
    })
  },

  async getById(id: string) {
    return instance<TSubscription>({
      url: `${SUBSCRIPTIONS}/${id}`,
      method: 'GET',
    })
  },

  async create(data: Omit<TSubscription, 'createdAt' | 'id'>) {
    return instance<TSubscription>({
      url: SUBSCRIPTIONS,
      method: 'POST',
      data,
    })
  },

  async update(id: string, data: Partial<TSubscription>) {
    return instance<TSubscription>({
      url: `${SUBSCRIPTIONS}/${id}`,
      method: 'PATCH',
      data,
    })
  },

  async delete(id: string) {
    return instance<TSubscription>({
      url: `${SUBSCRIPTIONS}/${id}`,
      method: 'DELETE',
    })
  },
}
