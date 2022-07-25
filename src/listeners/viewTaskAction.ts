import { BlockButtonAction } from '@slack/bolt'

import type { ActionMw, Deps } from '../types'
import { viewTaskModal } from '../views'

export const viewTaskAction =
  ({ dbClient }: Pick<Deps, 'dbClient'>): ActionMw<BlockButtonAction> =>
  async ({ client, ack, body, action }) => {
    await ack()

    const { taskId } = JSON.parse(action.value) as {
      taskId: string
    }

    const {
      user: { id },
    } = body

    const task = await dbClient.getTask(id, taskId)

    if (task) {
      const view = viewTaskModal(task)

      await client.views.open({ view, trigger_id: body.trigger_id })
    }
  }
