import {
  DatePicker,
  Divider,
  Input,
  Modal,
  Section,
  SlackViewDto,
  TextInput,
} from 'slack-block-builder'

import { ModalSubmission } from './../types'

export const addTaskModal = (): SlackViewDto =>
  Modal()
    .callbackId(ModalSubmission.AddTask)
    .title('Add Task')
    .blocks(
      Section({
        text: 'Add a due date and description for the new task.',
      }),
      Input({ label: 'Due Date' })
        .element(DatePicker().actionId('dueDate'))
        .optional(true),
      Input({ label: 'Title' }).element(TextInput().actionId('title')),
      Input({ label: 'Description' })
        .element(TextInput().actionId('content'))
        .optional(true),
      Divider()
    )
    .submit('Save')
    .buildToObject()
