import format from 'date-fns/format'
import { Modal, Section, SlackViewDto } from 'slack-block-builder'

import { ModalSubmission, Task } from './../types'

export const viewTaskModal = (task: Task): SlackViewDto =>
  Modal()
    .callbackId(ModalSubmission.AddTask)
    .title(`${task.title} ${task.isCompleted ? ':white_check_mark:' : ''}`)
    .blocks(
      Section({
        text: `${task.content ?? ' '}`,
      }),
      Section({
        text: `Due Date: ${
          task.dueDate
            ? format(
                new Date(Number(task.dueDate) * 1000).getTime(),
                'dd/MM/yyyy'
              )
            : 'none'
        }`,
      })
    )
    .buildToObject()
