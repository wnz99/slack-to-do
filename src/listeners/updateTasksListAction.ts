import { ActionMw, Deps } from '../types'
import { homeTab, tasksList } from '../views'
import { TASKS_PER_PAGE } from './../const'

export const updateTasksListAction = ({
  dbClient,
}: Pick<Deps, 'dbClient'>): ActionMw => {
  return async ({ ack, client, body, action }) => {
    await ack()

    const { page } = JSON.parse(action.action_id) as { page: number }

    const {
      user: { id },
    } = body

    const tasks = await dbClient.getTasks(id)

    const tasksBlocks = tasksList({
      tasks,
      page: page ?? 1,
      perPage: TASKS_PER_PAGE,
    })

    console.log('updateTasksListAction')

    const blocks = homeTab(tasksBlocks)

    await client.views.publish({
      user_id: id,
      view: {
        callback_id: 'home_view',
        ...blocks,
      },
    })
  }
}
