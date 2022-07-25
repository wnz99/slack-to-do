import type { ActionMw } from '../types'
import { addTaskModal } from '../views/addTaskModal'

export const addTaskAction =
  (): ActionMw =>
  async ({ client, ack, body, context }) => {
    await ack()

    const view = addTaskModal()

    await client.views.open({ view, trigger_id: body.trigger_id })

    context.isUpdateTaskList = true
  }
