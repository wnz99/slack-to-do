import { Deps, EventMw } from '../types'
import { homeTab, tasksList } from '../views'
import { TASKS_PER_PAGE } from './../const'

export const appHomeOpenedEvent = ({
  dbClient,
}: Pick<Deps, 'dbClient'>): EventMw<'app_home_opened'> => {
  return async ({ event, client, body }) => {
    const tasks = await dbClient.getTasks(event.user)

    const tasksBlocks = tasksList({
      tasks,
      page: 1,
      perPage: TASKS_PER_PAGE,
    })

    const blocks = homeTab(tasksBlocks)

    if (body.view) {
      await client.views.update({
        user_id: event.user,
        view: {
          callback_id: 'home_view',
          ...blocks,
        },
        view_id: body.view.id,
      })

      return
    }

    await client.views.publish({
      user_id: event.user,
      view: {
        callback_id: 'home_view',
        ...blocks,
      },
    })
  }
}
