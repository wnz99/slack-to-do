import format from 'date-fns/format'
import {
  Actions,
  Button,
  Divider,
  EasyPaginator,
  Section,
} from 'slack-block-builder'

import { TasksList, UserActions } from '../types'

export const tasksList = ({ tasks, perPage, page }: TasksList) =>
  EasyPaginator({
    perPage,
    items: tasks,
    page: page || 1,
    actionId: ({ page, offset }) =>
      JSON.stringify({ action: UserActions.UpdateTasksList, page, offset }),
    blocksForEach: ({ item }) => [
      Divider(),
      Section({
        text: `*${item.title}* ${item.isCompleted ? ':white_check_mark:' : ''}`,
      }),
      Section({
        text: `Due Date: ${
          item.dueDate
            ? format(
                new Date(Number(item.dueDate) * 1000).getTime(),
                'dd/MM/yyyy'
              )
            : 'none'
        }`,
      }),
      Actions().elements(
        Button({ text: 'View' })
          .actionId(UserActions.ViewTask)
          .value(
            JSON.stringify({
              taskId: item.id.toString(),
            })
          ),
        Button({ text: item.isCompleted ? 'Open' : 'Complete' })
          .actionId(UserActions.SetTaskComplete)
          .value(
            JSON.stringify({
              taskId: item.id.toString(),
              value: !item.isCompleted,
            })
          )
      ),
    ],
  }).getBlocks()
