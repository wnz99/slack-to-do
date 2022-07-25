import { BlockButtonAction } from '@slack/bolt'

import type { ActionMw, Deps } from '../types'
import { homeTab, tasksList } from '../views'
import { TASKS_PER_PAGE } from './../const'

export const setTaskCompleteAction =
  ({ dbClient }: Pick<Deps, 'dbClient'>): ActionMw<BlockButtonAction> =>
  async ({ ack, body, action, client }) => {
    await ack()

    const { value, taskId } = JSON.parse(action.value) as {
      taskId: string
      value: boolean
    }

    const {
      user: { id },
    } = body

    await dbClient.setTaskComplete(id, taskId, value)

    const tasks = await dbClient.getTasks(id)

    const tasksBlocks = tasksList({
      tasks,
      perPage: TASKS_PER_PAGE,
    })

    const blocks = homeTab(tasksBlocks)

    await client.views.publish({
      user_id: id,
      view: {
        callback_id: 'home_view',
        ...blocks,
      },
    })
  }
