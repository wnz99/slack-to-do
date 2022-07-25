import { Deps, InputType, Task, ViewMw, ViewState } from '../types'
import { homeTab, tasksList } from '../views'
import { TASKS_PER_PAGE } from './../const'

const makeTask = (state: ViewState) => {
  return Object.keys(state).reduce(
    (curr, input) => {
      const key = Object.keys(state[input])[0]

      const entry = state[input][key]

      if (entry.type === InputType.Datepicker && entry.selected_date) {
        return { ...curr, [key]: new Date(entry.selected_date) }
      }

      if (entry.type === InputType.PlainText && entry.value) {
        return { ...curr, [key]: entry.value }
      }

      return { ...curr }
    },
    { isCompleted: false } as Task
  )
}

export const addTaskView = ({ dbClient }: Pick<Deps, 'dbClient'>): ViewMw => {
  return async ({ ack, body, client }) => {
    await ack()

    const {
      user: { id },
      view: {
        state: { values },
      },
    } = body

    const task = makeTask(values)

    await dbClient.addTask(id, task)

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
}
